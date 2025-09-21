import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, RefreshCw, Settings, Sparkles, Target, Globe, TrendingUp, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Draggable placeholder component
const DraggablePlaceholder = ({ placeholder }: { placeholder: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ id: placeholder });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Badge
        variant="secondary"
        className="hover:shadow-warm hover:scale-105 transition-all duration-200"
      >
        {placeholder}
      </Badge>
    </div>
  );
};

// Template editor with drag zone
const TemplateEditor = ({ 
  templateKey, 
  template, 
  onTemplateChange, 
  onSave, 
  onReset,
  icon
}: { 
  templateKey: string; 
  template: string; 
  onTemplateChange: (value: string) => void; 
  onSave: () => void; 
  onReset: () => void;
  icon: React.ReactNode;
}) => {
  const insertPlaceholder = (placeholder: string, position: number) => {
    const newTemplate = template.slice(0, position) + placeholder + template.slice(position);
    onTemplateChange(newTemplate);
  };

  const handleTextareaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    const cursorPosition = textarea.selectionStart;
    
    // Store cursor position for drag drop
    (textarea as any)._cursorPosition = cursorPosition;
  };

  return (
    <Card className="shadow-craft hover:shadow-elegant transition-all duration-300 animate-fade-in">
      <CardHeader className="gradient-earth">
        <CardTitle className="capitalize flex items-center gap-3 text-foreground">
          {icon}
          {templateKey.replace('_', ' ')} Template
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Edit the prompt template for {templateKey} content generation. Drag placeholders into the template.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-3">
          <Label htmlFor={`template-${templateKey}`} className="text-sm font-medium">
            Template Content
          </Label>
          <div 
            className="relative min-h-[250px] rounded-lg border-2 border-dashed border-border/50 hover:border-primary/30 transition-colors duration-200"
            onDrop={(e) => {
              e.preventDefault();
              const placeholder = e.dataTransfer.getData('text/plain');
              const textarea = document.getElementById(`template-${templateKey}`) as HTMLTextAreaElement;
              const cursorPosition = (textarea as any)._cursorPosition || textarea.value.length;
              insertPlaceholder(placeholder, cursorPosition);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <Textarea
              id={`template-${templateKey}`}
              value={template}
              onChange={(e) => onTemplateChange(e.target.value)}
              onClick={handleTextareaClick}
              className="min-h-[240px] font-mono text-sm resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Drop placeholders here or type your prompt template..."
            />
            <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
              Drop Zone
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={onSave} 
            className="flex items-center gap-2 shadow-warm hover:shadow-craft transition-all duration-200"
          >
            <Save className="h-4 w-4" />
            Save Template
          </Button>
          <Button 
            variant="outline" 
            onClick={onReset}
            className="flex items-center gap-2 hover:bg-accent/10 transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            Reset to Default
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Admin = () => {
  const { toast } = useToast();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [templates, setTemplates] = useState({
    catalog: `System: "Act as a culturally-aware copywriter for Indian traditional handicrafts. Keep text concise, emotive, and factual. Use the local context and keep the tone respectful and authentic."

User prompt template:
"Write a product title and a 2-paragraph product description in {{language}} for a handmade {{product_category}} made by {{business}} located in {{location}}. Use simple language suitable for WhatsApp/Instagram, mention materials, technique, and one short story line about the artisan (2–3 sentences). Provide 6 short tags/keywords and a suggested retail price range for local buyers."`,
    
    social: `System: "Act like a social media growth specialist who knows Indian regional audiences."

User prompt template:
"Create 3 Instagram captions (short, medium, long) in {{language}} for a product called {{product_name}} by {{business}}. Include a short CTA and 10 viral hashtags tailored to {{target_location}}. Also, suggest 5 local influencer handles (format: @handle) that might appreciate sharing this craft. Add a one-line WhatsApp broadcast message."`,
    
    insights: `"List top 5 trending keywords and product variants in the category {{product_category}} within {{target_location}}. Suggest 3 actions the artisan can take this week to increase visibility (e.g., change hashtags, post time, collaborate)."`,
    
    geo_targeted: `"Tailor the short caption for audiences in {{target_location}}. Mention one local reference (festival, market, or cultural cue) and suggest the best time of day to post in {{target_location}}."`,
    
    update: `"Based on profile of {{business}} and products {{product_tags}}, provide a fresh 3-point content plan for the next 7 days in {{language}}. Include suggested post times and one short caption draft for each day."`
  });

  const placeholders = [
    "{{business}}", "{{product_name}}", "{{product_category}}", 
    "{{product_tags}}", "{{language}}", "{{location}}", "{{target_location}}"
  ];

  const templateIcons = {
    catalog: <Palette className="h-5 w-5" />,
    social: <Sparkles className="h-5 w-5" />,
    insights: <TrendingUp className="h-5 w-5" />,
    geo_targeted: <Globe className="h-5 w-5" />,
    update: <Target className="h-5 w-5" />
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
  };

  const handleSave = (templateKey: string) => {
    toast({
      title: "✨ Template Saved",
      description: `${templateKey.replace('_', ' ')} template has been updated successfully.`,
    });
  };

  const handleReset = (templateKey: string) => {
    toast({
      title: "🔄 Template Reset",
      description: `${templateKey.replace('_', ' ')} template has been reset to default.`,
    });
  };

  return (
    <div className="min-h-screen craft-texture gradient-earth">
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto space-y-8 p-6">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Settings className="h-8 w-8 text-primary animate-bounce-soft" />
              <h1 className="text-4xl font-bold gradient-warm bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Craft intelligent AI prompt templates for content generation with drag-and-drop simplicity
            </p>
          </div>

          {/* Placeholders Section */}
          <Card className="shadow-elegant animate-slide-in">
            <CardHeader className="gradient-warm text-white">
              <CardTitle className="flex items-center gap-3">
                <Sparkles className="h-6 w-6" />
                Available Placeholders
              </CardTitle>
              <CardDescription className="text-white/80">
                Drag these placeholders into your templates. They will be replaced with actual data during generation.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={placeholders} strategy={verticalListSortingStrategy}>
                  <div className="flex flex-wrap gap-3">
                    {placeholders.map((placeholder) => (
                      <div
                        key={placeholder}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', placeholder);
                        }}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <Badge 
                          variant="secondary" 
                          className="hover:shadow-warm hover:scale-105 transition-all duration-200 px-3 py-1.5 text-sm font-medium"
                        >
                          {placeholder}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </SortableContext>
                
                <DragOverlay>
                  {activeId ? (
                    <Badge variant="secondary" className="shadow-craft">
                      {activeId}
                    </Badge>
                  ) : null}
                </DragOverlay>
              </DndContext>
            </CardContent>
          </Card>

          {/* Templates Tabs */}
          <Tabs defaultValue="catalog" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 h-12 bg-card shadow-warm rounded-lg p-1">
              <TabsTrigger 
                value="catalog" 
                className="flex items-center gap-2 data-[state=active]:shadow-craft data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <Palette className="h-4 w-4" />
                Catalog
              </TabsTrigger>
              <TabsTrigger 
                value="social"
                className="flex items-center gap-2 data-[state=active]:shadow-craft data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <Sparkles className="h-4 w-4" />
                Social
              </TabsTrigger>
              <TabsTrigger 
                value="insights"
                className="flex items-center gap-2 data-[state=active]:shadow-craft data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <TrendingUp className="h-4 w-4" />
                Insights
              </TabsTrigger>
              <TabsTrigger 
                value="geo_targeted"
                className="flex items-center gap-2 data-[state=active]:shadow-craft data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <Globe className="h-4 w-4" />
                Geo-Targeted
              </TabsTrigger>
              <TabsTrigger 
                value="update"
                className="flex items-center gap-2 data-[state=active]:shadow-craft data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <Target className="h-4 w-4" />
                Updates
              </TabsTrigger>
            </TabsList>

            {Object.entries(templates).map(([key, template]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <TemplateEditor
                  templateKey={key}
                  template={template}
                  onTemplateChange={(value) => setTemplates(prev => ({
                    ...prev,
                    [key]: value
                  }))}
                  onSave={() => handleSave(key)}
                  onReset={() => handleReset(key)}
                  icon={templateIcons[key as keyof typeof templateIcons]}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;