import React, { useState } from 'react';
import { ArrowLeft, Search, Book, LayoutGrid as Layout, Code, GitBranch, Database, Shield, Cloud } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ProjectOverview } from './sections/ProjectOverview';
import { ProjectBlueprint } from './sections/ProjectBlueprint';
import { DevelopmentGuide } from './sections/DevelopmentGuide';
import { APIIntegration } from './sections/APIIntegration';
import { DatabaseSchema } from './sections/DatabaseSchema';
import { SecurityGuide } from './sections/SecurityGuide';
import { DeploymentGuide } from './sections/DeploymentGuide';

interface DocPortalProps {
  onBack: () => void;
}

interface DocSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType;
}

const DOC_SECTIONS: DocSection[] = [
  {
    id: 'overview',
    title: 'Project Overview',
    icon: Book,
    component: ProjectOverview
  },
  {
    id: 'blueprint',
    title: 'Architecture Blueprint',
    icon: Layout,
    component: ProjectBlueprint
  },
  {
    id: 'development',
    title: 'Development Guide',
    icon: Code,
    component: DevelopmentGuide
  },
  {
    id: 'api',
    title: 'API Integration',
    icon: GitBranch,
    component: APIIntegration
  },
  {
    id: 'database',
    title: 'Database Schema',
    icon: Database,
    component: DatabaseSchema
  },
  {
    id: 'security',
    title: 'Security Guide',
    icon: Shield,
    component: SecurityGuide
  },
  {
    id: 'deployment',
    title: 'Deployment Guide',
    icon: Cloud,
    component: DeploymentGuide
  }
];

export const DocPortal: React.FC<DocPortalProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const currentSection = DOC_SECTIONS.find(section => section.id === activeSection);
  const CurrentComponent = currentSection?.component || ProjectOverview;

  const filteredSections = DOC_SECTIONS.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-strong border-r border-neutral-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              aria-label="Go back to welcome screen"
              className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-white">OMBARO Docs</h1>
              <p className="text-white/80 text-sm">Development Documentation</p>
            </div>
            <div className="w-10" />
          </div>

          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-neutral-400" />}
              className="glass border-0 shadow-medium text-sm placeholder-white/60"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {filteredSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 text-left group ${
                  activeSection === section.id
                    ? 'bg-primary-100 text-primary-700 shadow-soft'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-200'
                    : 'bg-neutral-100 group-hover:bg-neutral-200'
                }`}>
                  <section.icon className={`w-5 h-5 ${
                    activeSection === section.id ? 'text-primary-600' : 'text-neutral-600'
                  }`} />
                </div>
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-200">
          <div className="text-center text-sm text-neutral-600">
            <p>OMBARO v1.0.0</p>
            <p>© 2025 OMBARO Team</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content Header */}
        <div className="bg-white border-b border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                {currentSection?.title || 'Documentation'}
              </h1>
              <p className="text-neutral-600">OMBARO Development Documentation</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            <CurrentComponent />
          </div>
        </div>
      </div>
    </div>
  );
};