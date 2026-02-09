export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    gradient: string;
    span: 'normal' | 'wide' | 'tall';
}

export interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}
