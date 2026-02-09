import { Project } from '@/types';

export const projects: Project[] = [
    {
        id: 'travelio-ai',
        title: 'Travelio AI',
        description: 'AI-powered travel planning platform with personalized itineraries and real-time recommendations.',
        techStack: ['Next.js', 'OpenAI', 'Supabase', 'Tailwind'],
        gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
        span: 'wide',
    },
    {
        id: 'documind-rag',
        title: 'DocuMind RAG',
        description: 'Intelligent document analysis using Retrieval-Augmented Generation for enterprise knowledge bases.',
        techStack: ['Python', 'LangChain', 'Pinecone', 'FastAPI'],
        gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
        span: 'normal',
    },
    {
        id: 'yolo11-detection',
        title: 'YOLO11 Detection',
        description: 'Real-time object detection system for manufacturing quality control with 99.2% accuracy.',
        techStack: ['Python', 'YOLO11', 'OpenCV', 'TensorRT'],
        gradient: 'from-emerald-400 via-green-500 to-teal-600',
        span: 'tall',
    },
    {
        id: 'retail-pos',
        title: 'Retail POS Systems',
        description: 'Modern point-of-sale solutions with inventory management and analytics dashboard.',
        techStack: ['Electron', 'React', 'PostgreSQL', 'Node.js'],
        gradient: 'from-orange-400 via-amber-500 to-yellow-500',
        span: 'normal',
    },
];

export const colors = {
    primary: {
        purple: '#a855f7',
        cyan: '#22d3ee',
        pink: '#ec4899',
    },
    background: {
        dark: '#030712',
        card: 'rgba(17, 24, 39, 0.7)',
    },
    text: {
        primary: '#f9fafb',
        secondary: '#9ca3af',
    },
};
