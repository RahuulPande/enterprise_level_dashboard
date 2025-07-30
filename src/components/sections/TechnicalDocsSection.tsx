'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, 
  Code, 
  Database, 
  Server, 
  Shield, 
  Zap, 
  CheckCircle, 
  ChevronDown, 
  ChevronRight,
  Copy,
  ExternalLink,
  Search,
  Mail,
  Calendar,
  FileText,
  Settings,
  Lock,
  Cloud,
  GitBranch,
  Users,
  Clock,
  DollarSign,
  AlertTriangle,
  Layers,
  Monitor,
  HelpCircle,
  ArrowRight,
  Target,
  Gauge,
  Globe
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'technical' | 'business' | 'integration';
  tags: string[];
}

const faqData: FAQItem[] = [
  {
    id: 'splunk-integration',
    question: 'How does this integrate with our existing Splunk setup?',
    answer: 'We use Splunk\'s REST API to query logs every 60 seconds. No changes to your Splunk configuration needed - just API credentials. The integration is read-only and doesn\'t affect your existing dashboards or searches.',
    category: 'technical',
    tags: ['splunk', 'integration', 'api']
  },
  {
    id: 'other-tools',
    question: 'What if we use Elastic/Datadog instead of Splunk?',
    answer: 'Our platform has adapters for major logging tools including Elasticsearch, Datadog, New Relic, and Sumo Logic. Same features, different connector. The AI analysis remains consistent across all data sources.',
    category: 'technical',
    tags: ['elasticsearch', 'datadog', 'adapters']
  },
  {
    id: 'ai-matching',
    question: 'How does the AI defect matching actually work?',
    answer: 'We use NLP to analyze defect descriptions, extract key terms, and compare against historical defects using cosine similarity with BERT embeddings. The ML model improves with each match confirmation, achieving 96% accuracy.',
    category: 'technical',
    tags: ['ai', 'nlp', 'machine-learning']
  },
  {
    id: 'air-gapped',
    question: 'Can this work in our air-gapped environment?',
    answer: 'Yes. The platform can be deployed entirely on-premise with no external dependencies. All AI models can be pre-trained and deployed locally. No internet connection required after installation.',
    category: 'technical',
    tags: ['security', 'on-premise', 'air-gapped']
  },
  {
    id: 'service-discovery',
    question: 'How do you handle service discovery?',
    answer: 'Services are auto-discovered from log patterns using regex and ML classification. You can also manually configure services or import from CMDB/ServiceNow. Discovery typically finds 95% of services automatically.',
    category: 'technical',
    tags: ['discovery', 'cmdb', 'automation']
  },
  {
    id: 'savings-calculation',
    question: 'How did you calculate $16.7M savings?',
    answer: 'Based on 100-person team (30 Zurich @ $800/day, 70 Pune @ $300/day) with 25% faster resolution, 40% less manual work, and 90% downtime reduction. Detailed calculation available in ROI section.',
    category: 'business',
    tags: ['roi', 'savings', 'calculation']
  },
  {
    id: 'timeline',
    question: 'What\'s the implementation timeline?',
    answer: '6 weeks standard. Week 1-2: Integration setup, Week 3-4: AI training on historical data, Week 5-6: Testing & go-live. Parallel running with existing tools ensures zero downtime.',
    category: 'business',
    tags: ['timeline', 'implementation', 'rollout']
  },
  {
    id: 'team-size',
    question: 'What if our team is smaller/larger?',
    answer: 'Savings scale linearly. 50-person team = $8.35M annually, 200-person team = $33.4M annually. The platform handles teams from 10 to 1000+ members with the same feature set.',
    category: 'business',
    tags: ['scaling', 'team-size', 'cost']
  },
  {
    id: 'vendor-lockin',
    question: 'Is there vendor lock-in?',
    answer: 'No. All your data remains in your systems. Complete export functionality available. Open API standards ensure you can migrate anytime. We enhance your existing tools, not replace them.',
    category: 'business',
    tags: ['vendor-lockin', 'migration', 'data-ownership']
  },
  {
    id: 'jira-versions',
    question: 'Which versions of JIRA are supported?',
    answer: 'JIRA Cloud, Server 8.0+, and Data Center. We use REST API v2/v3 with backward compatibility. Also supports Azure DevOps, GitHub Issues, and custom ticketing systems.',
    category: 'integration',
    tags: ['jira', 'versions', 'ticketing']
  },
  {
    id: 'ai-threshold',
    question: 'Can we customize the AI matching threshold?',
    answer: 'Yes. Default is 85% similarity, adjustable per team preference (70-95% range). Different thresholds for different severity levels. Machine learning adapts to your team\'s feedback patterns.',
    category: 'integration',
    tags: ['ai', 'customization', 'threshold']
  },
  {
    id: 'replace-tools',
    question: 'Does this replace our existing monitoring tools?',
    answer: 'No, it aggregates and enhances them. Think of it as a smart orchestration layer that connects Splunk, JIRA, PagerDuty, and other tools. Your existing investments remain valuable.',
    category: 'integration',
    tags: ['monitoring', 'aggregation', 'orchestration']
  },
  {
    id: 'false-positives',
    question: 'How do we handle false positives?',
    answer: 'ML model learns from feedback. False positive rate drops from 20% to <5% in first month. Built-in feedback loops allow quick correction. Manual override always available.',
    category: 'integration',
    tags: ['false-positives', 'feedback', 'accuracy']
  }
];

const codeExamples = {
  splunk: `{
  "search": "index=application_logs status=error | stats count by service",
  "earliest_time": "-5m",
  "latest_time": "now",
  "output_mode": "json"
}`,
  jira: `{
  "fields": {
    "project": {"key": "INC"},
    "summary": "Service Failure: Payment Gateway",
    "description": "Auto-generated from AI Health Monitor\\nSeverity: Critical\\nAffected Service: payment-gateway-v2",
    "priority": {"name": "Critical"},
    "customfield_10001": "AI-MATCH-95.7%",
    "labels": ["auto-generated", "ai-detected"]
  }
}`,
  bash: `# 1. Configure Splunk Connection
curl -X POST https://api.healthmonitor.ai/integrations/splunk \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "host": "splunk.yourbank.com",
    "port": 8089,
    "username": "service_account",
    "password": "encrypted_password",
    "verify_ssl": true
  }'

# 2. Test Connection
curl https://api.healthmonitor.ai/integrations/splunk/test

# 3. Start Data Ingestion
curl -X POST https://api.healthmonitor.ai/integrations/splunk/start`
};

export default function TechnicalDocsSection() {
  const [activeSection, setActiveSection] = useState('architecture');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const sections = [
    { id: 'architecture', label: 'Technical Architecture', icon: Server },
    { id: 'transition', label: 'Mock to Real Data', icon: GitBranch },
    { id: 'security', label: 'Security & Compliance', icon: Shield },
    { id: 'faqs', label: 'Frequently Asked Questions', icon: HelpCircle },
    { id: 'scaling', label: 'Scaling & Performance', icon: Gauge },
    { id: 'quickstart', label: 'Quick Start Guide', icon: Zap }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderArchitecture = () => (
    <div className="space-y-8">
      {/* Real-World Requirements */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Database className="w-6 h-6 mr-3 text-blue-600" />
          Real-World Implementation Requirements
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Cloud className="w-5 h-5 mr-2 text-green-600" />
              Required Integrations
            </h4>
            <div className="space-y-4">
              {[
                {
                  name: 'Splunk Enterprise',
                  version: 'Version 8.0+',
                  requirements: ['REST API access', 'Search head access', '90-day data retention'],
                  icon: Monitor
                },
                {
                  name: 'JIRA Cloud/Server',
                  version: 'REST API v2/v3',
                  requirements: ['Project admin access', 'Custom field creation', 'Webhook support'],
                  icon: FileText
                },
                {
                  name: 'ServiceNow (Optional)',
                  version: 'Table API',
                  requirements: ['Incident management module', 'CMDB access'],
                  icon: Settings
                },
                {
                  name: 'Email Server',
                  version: 'SMTP/OAuth2',
                  requirements: ['TLS 1.3 support', 'Authentication', 'Rate limiting'],
                  icon: Mail
                }
              ].map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center mb-2">
                    <integration.icon className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-medium text-gray-900">{integration.name}</span>
                    <span className="ml-2 text-sm text-gray-500">({integration.version})</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {integration.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Server className="w-5 h-5 mr-2 text-purple-600" />
              Infrastructure Requirements
            </h4>
            <div className="space-y-4">
              {[
                { component: 'Application Server', specs: '8 vCPUs, 32GB RAM', icon: Server },
                { component: 'Database', specs: 'PostgreSQL 12+ or MongoDB 4.4+', icon: Database },
                { component: 'Storage', specs: '500GB minimum (scales with log volume)', icon: Layers },
                { component: 'Network', specs: 'Internal access to Splunk, JIRA APIs', icon: Globe }
              ].map((infra, index) => (
                <motion.div
                  key={infra.component}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-purple-50 rounded-lg p-4 border border-purple-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <infra.icon className="w-5 h-5 mr-3 text-purple-600" />
                      <span className="font-medium text-gray-900">{infra.component}</span>
                    </div>
                    <span className="text-sm text-gray-600">{infra.specs}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* API Data Flow */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Code className="w-6 h-6 mr-3 text-green-600" />
          API Endpoints & Data Flow
        </h3>
        
        {/* Flow Diagram */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4 p-6 bg-gray-50 rounded-xl">
            {[
              { name: 'Splunk', color: 'bg-orange-500', next: true },
              { name: 'Our Platform', color: 'bg-blue-500', next: true },
              { name: 'AI Engine', color: 'bg-purple-500', next: true },
              { name: 'Dashboard', color: 'bg-green-500', next: true },
              { name: 'JIRA/Email', color: 'bg-red-500', next: false }
            ].map((step, index) => (
              <div key={step.name} className="flex items-center">
                <div className={`${step.color} text-white px-4 py-2 rounded-lg text-sm font-medium`}>
                  {step.name}
                </div>
                {step.next && <ArrowRight className="w-5 h-5 mx-2 text-gray-400" />}
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Splunk Query Example</h4>
              <div className="relative">
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{codeExamples.splunk}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeExamples.splunk, 'splunk')}
                  className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
                >
                  {copiedCode === 'splunk' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">JIRA Ticket Creation</h4>
              <div className="relative">
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{codeExamples.jira}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeExamples.jira, 'jira')}
                  className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
                >
                  {copiedCode === 'jira' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransition = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <GitBranch className="w-6 h-6 mr-3 text-blue-600" />
          Transition from Mock to Real Data
        </h3>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Component</th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-600">Demo Mode</th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-green-600">Production Mode</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  component: 'Data Source',
                  demo: 'Mock Generator',
                  production: 'Splunk Real-time API'
                },
                {
                  component: 'Service List',
                  demo: '150 Simulated',
                  production: 'Auto-discovered from logs'
                },
                {
                  component: 'Alerts',
                  demo: 'Simulated events',
                  production: 'Actual log errors'
                },
                {
                  component: 'AI Matching',
                  demo: 'Pre-matched demos',
                  production: 'Live ML processing'
                },
                {
                  component: 'Notifications',
                  demo: 'UI only',
                  production: 'Email/Slack/Teams'
                },
                {
                  component: 'Historical Data',
                  demo: 'Generated patterns',
                  production: '90+ days Splunk history'
                }
              ].map((row, index) => (
                <motion.tr
                  key={row.component}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.component}</td>
                  <td className="border border-gray-200 px-4 py-3 text-blue-600">{row.demo}</td>
                  <td className="border border-gray-200 px-4 py-3 text-green-600">{row.production}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Migration Steps */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">6-Step Migration Process</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { step: 1, title: 'Configure Splunk connection', duration: '1 day' },
              { step: 2, title: 'Map service names from logs', duration: '2 days' },
              { step: 3, title: 'Train AI on historical data', duration: '3 days' },
              { step: 4, title: 'Parallel run with mock data', duration: '1 week' },
              { step: 5, title: 'Gradual transition to live data', duration: '3 days' },
              { step: 6, title: 'Decommission mock generator', duration: '1 day' }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{step.title}</div>
                  <div className="text-sm text-gray-600">{step.duration}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-3 text-red-600" />
          Security & Compliance
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-red-600" />
              Authentication & Authorization
            </h4>
            <div className="space-y-3">
              {[
                'SSO/SAML 2.0 integration',
                'Role-based access control (RBAC)',
                'API key management with rotation',
                'Session management & timeout',
                'Multi-factor authentication (MFA)',
                'OAuth 2.0 / OpenID Connect'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-blue-600" />
              Data Security
            </h4>
            <div className="space-y-3">
              {[
                'Encryption at rest (AES-256)',
                'TLS 1.3 for data in transit',
                'No PII storage policy',
                'Log data anonymization',
                'Data residency controls',
                'Secure key management (HSM)'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-purple-600" />
            Compliance Standards
          </h4>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: 'SOC 2 Type II', status: 'Ready', color: 'green' },
              { name: 'GDPR', status: 'Compliant', color: 'green' },
              { name: 'PCI-DSS', status: 'Compatible', color: 'blue' },
              { name: 'ISO 27001', status: 'In Progress', color: 'yellow' }
            ].map((compliance, index) => (
              <motion.div
                key={compliance.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 text-center ${
                  compliance.color === 'green' ? 'bg-green-50 border-green-200' :
                  compliance.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                  'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="font-semibold text-gray-900">{compliance.name}</div>
                <div className={`text-sm ${
                  compliance.color === 'green' ? 'text-green-600' :
                  compliance.color === 'blue' ? 'text-blue-600' :
                  'text-yellow-600'
                }`}>
                  {compliance.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFAQs = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="business">Business</option>
            <option value="integration">Integration</option>
          </select>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      faq.category === 'technical' ? 'bg-blue-100 text-blue-700' :
                      faq.category === 'business' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {faq.category}
                    </span>
                    {faq.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {expandedFAQ === faq.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white"
                  >
                    <div className="px-6 py-4 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderScaling = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Gauge className="w-6 h-6 mr-3 text-indigo-600" />
          Scaling & Performance
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h4>
            <div className="space-y-4">
              {[
                { metric: 'Log Processing Rate', value: '1M+ logs/minute', icon: Zap },
                { metric: 'Dashboard Updates', value: 'Sub-second real-time', icon: Monitor },
                { metric: 'Concurrent Users', value: '1000+ supported', icon: Users },
                { metric: 'Uptime SLA', value: '99.9% guaranteed', icon: CheckCircle }
              ].map((perf, index) => (
                <motion.div
                  key={perf.metric}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-200"
                >
                  <div className="flex items-center">
                    <perf.icon className="w-5 h-5 mr-3 text-indigo-600" />
                    <span className="font-medium text-gray-900">{perf.metric}</span>
                  </div>
                  <span className="text-indigo-600 font-semibold">{perf.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Scaling Options</h4>
            <div className="space-y-4">
              {[
                { option: 'Horizontal API Scaling', description: 'Auto-scaling based on load' },
                { option: 'Database Read Replicas', description: 'Multi-region read performance' },
                { option: 'CDN Global Deployment', description: 'Edge caching worldwide' },
                { option: 'Multi-Region Support', description: 'Data sovereignty compliance' }
              ].map((scale, index) => (
                <motion.div
                  key={scale.option}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="font-medium text-gray-900">{scale.option}</div>
                  <div className="text-sm text-gray-600 mt-1">{scale.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuickStart = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-3 text-yellow-600" />
          Quick Start Guide
        </h3>

        <div className="space-y-8">
          {/* Day 1 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Day 1: Connect Your Systems
            </h4>
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 p-6 rounded-lg text-sm overflow-x-auto">
                <code>{codeExamples.bash}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeExamples.bash, 'bash')}
                className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
              >
                {copiedCode === 'bash' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Implementation Timeline</h4>
            <div className="space-y-4">
              {[
                {
                  period: 'Day 2-7',
                  title: 'Configure Services',
                  tasks: ['Auto-discovery runs', 'Map to business services', 'Set up alert thresholds', 'Configure team notifications']
                },
                {
                  period: 'Week 2',
                  title: 'AI Training',
                  tasks: ['Historical data analysis', 'Pattern recognition setup', 'Defect matching calibration', 'Prediction model training']
                },
                {
                  period: 'Week 3-4',
                  title: 'Testing & Validation',
                  tasks: ['Parallel running with existing tools', 'Team training sessions', 'Fine-tune thresholds', 'Load testing']
                },
                {
                  period: 'Week 5-6',
                  title: 'Go-Live',
                  tasks: ['Production cutover', 'Monitor performance', 'Collect feedback', 'Full feature activation']
                }
              ].map((phase, index) => (
                <motion.div
                  key={phase.period}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{phase.title}</div>
                      <div className="text-sm text-gray-600">{phase.period}</div>
                    </div>
                  </div>
                  <ul className="ml-11 space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'architecture':
        return renderArchitecture();
      case 'transition':
        return renderTransition();
      case 'security':
        return renderSecurity();
      case 'faqs':
        return renderFAQs();
      case 'scaling':
        return renderScaling();
      case 'quickstart':
        return renderQuickStart();
      default:
        return renderArchitecture();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Book className="w-8 h-8 mr-3 text-blue-600" />
          Technical Documentation & FAQ
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Comprehensive technical details, implementation guides, and frequently asked questions 
          for real-world deployment of the AI Health Monitor platform.
        </p>
      </motion.div>

      {/* Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <section.icon className="w-5 h-5 mr-2" />
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need More Information?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-center justify-center">
            <Book className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-gray-700">Complete implementation documentation available post-hackathon</span>
          </div>
          <div className="flex items-center justify-center">
            <Mail className="w-5 h-5 mr-2 text-green-600" />
            <span className="text-gray-700">Technical questions? tech@healthmonitor.ai</span>
          </div>
          <div className="flex items-center justify-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-600" />
            <span className="text-gray-700">Schedule a technical deep-dive session</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}