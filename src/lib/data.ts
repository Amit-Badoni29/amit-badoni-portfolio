export const personal = {
  name: 'Amit Badoni',
  title: 'Full-Stack Developer',
  tagline: 'Full-Stack Developer building scalable web experiences',
  email: 'badoni.amit100@gmail.com',
  phone: '+91-6398651767',
  location: 'Noida, India',
  linkedin: 'https://www.linkedin.com/in/amit-badoni-7821522a6/',
  github: 'https://github.com/Amit-Badoni29',
  summary:
    'Full-Stack Developer with hands-on experience in the MERN stack and Next.js. Skilled in building scalable web applications, secure REST APIs, authentication systems, and inventory management modules using Express.js, PostgreSQL, Prisma ORM, and TypeScript.',
};

export const skills = [
  {
    category: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'Shadcn/UI'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    category: 'Database',
    items: ['MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'ORM / ODM',
    items: ['Prisma ORM', 'Mongoose'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'Swagger', 'Postman'],
  },
];

export const allTechnologies = [
  'JavaScript',
  'TypeScript',
  'React.js',
  'Next.js',
  'Node.js',
  'Express.js',
  'PostgreSQL',
  'MongoDB',
  'MySQL',
  'Prisma ORM',
  'Mongoose',
  'Tailwind CSS',
  'Shadcn/UI',
  'Git',
  'GitHub',
  'Swagger',
  'Postman',
  'Redis',
];

export const floatingTechs = [
  { label: 'React', top: '6%', left: '8%', size: 'text-2xl sm:text-3xl', delay: 0 },
  { label: 'Next.js', top: '14%', left: '62%', size: 'text-xl sm:text-2xl', delay: 0.8 },
  { label: 'TypeScript', top: '42%', left: '4%', size: 'text-lg sm:text-xl', delay: 1.5 },
  { label: 'Node.js', top: '38%', left: '72%', size: 'text-2xl sm:text-3xl', delay: 0.3 },
  { label: 'Express', top: '68%', left: '16%', size: 'text-base sm:text-lg', delay: 1.1 },
  { label: 'PostgreSQL', top: '74%', left: '54%', size: 'text-xl sm:text-2xl', delay: 0.6 },
  { label: 'Prisma', top: '24%', left: '34%', size: 'text-lg sm:text-xl', delay: 1.8 },
  { label: 'MongoDB', top: '56%', left: '40%', size: 'text-base sm:text-lg', delay: 0.9 },
];

export const experience = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Nexzem Technologies',
    period: 'Apr – Jul 2026',
    location: 'Dehradun, Uttarakhand, India · On-site',
    points: [
      'Contributing to a multi-tenant ERP/POS platform supporting 8+ business verticals with scalable backend APIs and inventory management.',
      'Developing RESTful APIs and implementing Role-Based Access Control (RBAC).',
      'Collaborating on database design and production deployments with the engineering team.',
    ],
  },
  {
    role: 'Frontend Intern',
    company: 'Aiking Solutions Pvt. Ltd.',
    period: 'Nov – Dec 2025',
    location: 'Remote',
    points: [
      'Developed responsive and reusable UI components for an AI-powered job application automation platform using React.js and Tailwind CSS.',
    ],
  },
];

export const projects = [
  {
    name: 'Local Business Operating System (LBOS)',
    subtitle: 'Multi-Tenant ERP Platform',
    stack: ['Next.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'Prisma', 'Redis'],
    points: [
      'Built a scalable multi-tenant ERP platform for local businesses with Role-Based Access Control (Owner, Manager, Cashier).',
      'Developed Authentication, Business & Outlet Onboarding, Product Catalog, Categories, Product Variants, and Inventory Management modules.',
      'Designed scalable REST APIs using Express.js, Prisma ORM, PostgreSQL, JWT, Redis, Zod Validation, and Swagger following clean architecture.',
    ],
    image: 'https://images.pexels.com/photos/37594411/pexels-photo-37594411.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Swiggy Clone',
    subtitle: 'Food Delivery Web App',
    stack: ['React.js', 'Tailwind CSS'],
    points: [
      'Built a responsive food delivery web application.',
      'Integrated REST APIs to display restaurant listings and menus.',
      'Implemented cart management with a responsive UI.',
    ],
    image: 'https://images.pexels.com/photos/7258492/pexels-photo-7258492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Himalayan Yatra Travels',
    subtitle: 'Cab Booking Platform',
    stack: ['Next.js', 'Tailwind CSS'],
    points: [
      'Built an SEO-optimized cab booking website for hill-region travelers with transparent pricing, private booking workflows, and a WhatsApp-based inquiry system.',
    ],
    image: 'https://images.pexels.com/photos/8514722/pexels-photo-8514722.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const education = [
  {
    degree: 'Master of Computer Application',
    school: 'Shri Guru Ram Rai University, Dehradun',
    period: '2023 – 2025',
  },
  {
    degree: 'Bachelor of Computer Application',
    school: 'Shri Guru Ram Rai University, Dehradun',
    period: '2020 – 2023',
  },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];
