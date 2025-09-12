import { GradientScheme } from "@/utils/gradients";

interface Slide {
  image: string;
  url: string;
  title: string;
  subtitle: string;
  gradientScheme: GradientScheme;
}

interface ContentBlock {
  type: "text" | "image" | "video" | "gallery";
  orientation?: "portrait" | "landscape" | "poster";
  content?: string;
  src?: string;
  images?: string[];
  alt?: string;
  className?: string;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  metadata: {
    year: string;
    category: string;
    technologies: string[];
    role: string;
  };
  hero: {
    image: string;
    alt?: string;
    orientation: "portrait" | "landscape";
  };
  content: {
    blocks: ContentBlock[];
  };
  slide: Slide;
}

export const projects: Project[] = [
  {
    id: "ddw-2025",
    slug: "dutch-design-week-2025",
    title: "Dutch Design Week 2025",
    description:
      "Bringing people together with virtual hugs! An interactive installation that explores human connection through technology, combining real-time body tracking and digital visualization, translating movements and interactions into a shared and immersive experience.",
    metadata: {
      year: "2025",
      category: "Interactive Installation",
      technologies: ["Spline", "WebGL", "TouchDesigner"],
      role: "Lead Developer & Creative Technologist",
    },
    hero: {
      image: "/images/ddw/transluscent-blobs.png",
      orientation: "landscape",
    },
    content: {
      blocks: [
        {
          type: "text",
          content: `## The Concept
            A creative installation that uses a specialized depth camera to track and visualize the movements of two people, standing on a designated spot on the floor. The people interacting are represented as smooth, abstract entities that gradually merge as they move closer together, symbolizing human connection in a positive and poetic way. This interaction is expressed through dynamic animations, evolving shapes, colours, lighting effects, and environment design, creating an experience that feels both interactive and emotionally engaging.`,
        },
        {
          type: "image",
          src: "/images/ddw/generated-hug.png",
          alt: "Generated hug visualization",
          orientation: "landscape",
        },
        {
          type: "text",
          content: `## The Process
            The project went through many iterations, both technically and visually, as me and my teammate explored how best to translate the idea of human connection into an installation. I developed different proof of concepts (POCs) using a variety of technologies and methods — starting from web-based experiments, through 3D prototypes in Blender and Unity, to using TouchDesigner for the final demo. Along the way, we tested materials, hardware (depth cameras, sensors, projectors), colors, environments, and specific interaction designs to shape not only how it looked, but also what we wanted users to feel. This opened up space for creative freedom and exploration, pushing the boundaries of what an interactive installation could become."`,
        },
        {
          type: "image",
          src: "/images/ddw/touch-designer-process.png",
          alt: "TouchDesigner process",
          orientation: "landscape",
        },
        {
          type: "text",
          content: `## Constat Exploration and Iteration
           The process was driven by constant exploration and iteration, testing different tools and approaches, with largest focus on how to achieve the smooth blending of the two entities. Each prototype brought us closer to finding the right balance of visuals, interaction flow, and emotions that could truly represent human connection.`,
        },
        {
          type: "gallery",
          images: [
            "/images/ddw/test1.png",
            "/images/ddw/test2.png",
            "/images/ddw/test5.png",
          ],
        },
        {
          type: "text",
          content: `## The Initial Tracking Demo
            For the initial POC demo, I created a web-based hand-tracking demo using WebGL, [Spline](https://spline.design/), and [MediaPipe](https://github.com/google-ai-edge/mediapipe). The interaction allows users to control a soft, blob-like form with their hand, while a static gummy-like virtual human acts as the second entity. When the two overlap, especially at the center of its body, the forms begin to merge and grow into a large, rounded shape, playfully simulating the feeling of human connection.`,
        },
        {
          type: "video",
          src: "/images/ddw/BlobSprint1Demo.mov",
        },
        {
          type: "text",
          content: `## The Poster
           For the poster design, we wanted to capture the emotional essence of the project in a single visual. The two abstract, glowing entities merging together symbolize the intimacy of a hug and the warmth of human connection, while the bold gradient typography reinforces the meaning of the message.`,
        },
        {
          type: "image",
          src: "/images/ddw.png",
          alt: "Poster",
          orientation: "poster",
        },
        {
          type: "text",
          content: `## The Final Demo
            The final demo was developed using TouchDesigner and the environment setup included an Azure Kinect, a powerful PC, and a large screen. The physical floor setup guided participants to two marked spots, where the depth camera captured their movements while filtering out the surrounding audience. An introductory ‘HUG’ animation, formed from metaballs, smoothly transitioned into the tracked blob-entities once participants entered the interaction zone. This version focused on achieving the blending of the entities and functionality for a fluid and immersive experience which will be further enhanced visually.`,
        },
        {
          type: "video",
          src: "/images/ddw/InnovationsInsightDemoVideo.MOV",
        },
      ],
    },
    slide: {
      image: "/images/ddw.png",
      url: "/dutch-design-week-2025",
      title: "Dutch Design Week 2025",
      subtitle: "Virtual Hugs",
      gradientScheme: {
        from: "rgb(245, 245, 245)",
        via: "rgba(251, 146, 60, 0.3)",
        to: "rgba(236, 72, 153, 0.3)",
      },
    },
  },
  {
    id: "detaile",
    slug: "detaile",
    title: "Detaile",
    description:
      "Detaile explores the idea of a stylist application that generates personalized outfit recommendations powered by Artificial Intelligence which are adjusted to the user's personal style, preferences, and location.",
    metadata: {
      year: "2025",
      category: "Native iOS Application",
      technologies: ["SwiftUI", "AI", "OpenAI API", "CoreML"],
      role: "Mobile Developer",
    },
    hero: {
      image: "/images/detaile/detaile-hero.png",
      orientation: "portrait",
    },
    content: {
      blocks: [
        {
          type: "text",
          content: `## The Concept
          Users can create a virtual wardrobe by uploading photos of their own clothing items, turning the app into a digital reflection of their real closet. Based on this wardrobe, the app generates tailored outfit suggestions that adapt to different daily contexts - such as the current weather, personal style preferences, favorite colors, or upcoming events. This approach not only helps fashion enthusiasts experiment with new looks, but also supports users who aren't really into fashion and simply want to save time by also removing the daily stress of deciding what to wear.
         `,
        },
        {
          type: "image",
          src: "/images/detaile/detaile-concept.png",
          alt: "Detaile Concept",
          orientation: "landscape",
        },
        {
          type: "text",
          content: `## The Process
           I decided to develop this project as a native iOS application, drawing on Apple’s Human Interface Guidelines for structure and design best practices. The recommendations initially began as a simple rules-based system that matched clothing categories, applied color harmony, and scored outfit completeness, but it lacked personalization. Then, I transitioned to CoreML, enabling fast on-device processing that kept wardrobe data private, worked offline, reduced latency, and avoided API costs, while handling tasks like clothing classification, color analysis, and weather-based scoring. To push the concept further, I integrated optional usage of OpenAI’s GPT-4 Vision, which added contextual understanding and natural-language suggestions, creating a hybrid approach that combined the speed and privacy of CoreML with the flexibility and creativity of external AI.`,
        },
        {
          type: "gallery",
          images: [
            "/images/detaile/detaile-wardrobe.png",
            "/images/detaile/detaile-item-details.png",
            "/images/detaile/detaile-account.png",
          ],
        },
        {
          type: "text",
          content: `## Additional Features
          Further enhancing the experience, I added features that make the virtual wardrobe both functional and visually engaging. Each clothing item has its background removed and is displayed with a thick white border, giving it a playful ‘sticker-like’ look on the daily detail page. Using GPT-4 Vision, the app automatically detects colors and clothing types from uploaded images, reducing manual input and making the wardrobe easier to manage, since that was a major pain point which costed users a lot of time. On top of that, a style grid is able to capture user preferences, location data adapts suggestions to weather, and flexible settings let users choose whether to prioritize style, color, events, weather — or even combine all of them. Together, these features make recommendations more personalized, intuitive, and fun to use.`,
        },
        {
          type: "gallery",
          images: [
            "/images/detaile/detaile-style-grid.png",
            "/images/detaile/detaile-location.png",
            "/images/detaile/detaile-settings.png",
          ],
        },
        {
          type: "text",
          content: `## The Poster`,
        },
        {
          type: "image",
          src: "/images/detaile/detaile-poster.png",
          alt: "Poster",
          orientation: "poster",
        },
        {
          type: "text",
          content: `## The Final Demo
          The final demo provides a refined and polished user experience. Uploaded clothing images can be manually resized to fit neatly in the wardrobe to maintain a consistent look. Users can like outfits, which are saved to a dedicated tab and used to improve the recommendation model, while dislikes are also tracked so the system adapts over time. To make the application more intuitive, more help screens, onboarding guidance, and a ‘recently deleted’ section similar to the iOS gallery was added, ensuring users have full control throughout their styling journey.`,
        },
        {
          type: "gallery",
          images: [
            "/images/detaile/detaile-daily-detaile.png",
            "/images/detaile/detaile-favorites.png",
            "/images/detaile/detaile-resize.png",
          ],
        },
      ],
    },
    slide: {
      image: "/images/detaile.png",
      url: "/detaile",
      title: "Detaile",
      subtitle: "Perfect Outfits",
      gradientScheme: {
        from: "rgb(245, 245, 245)",
        via: "rgb(228, 228, 231)",
        to: "rgb(214, 211, 209)",
      },
    },
  },
  {
    id: "spotlight",
    slug: "spotlight",
    title: "Spotlight",
    description:
      "Discover and recommend local events based on your interests and preferences.",
    metadata: {
      year: "2024",
      category: "Progressive Web App",
      technologies: [
        "Next.js",
        "Spotify API",
        "SCSS",
        "Recommendation Algorithm",
      ],
      role: "Frontend Developer",
    },
    hero: {
      image: "/images/spotlight.png",
      orientation: "portrait",
    },
    content: {
      blocks: [
        {
          type: "text",
          content:
            "Spotlight helps users discover local events and activities based on their interests, location, and social connections.",
        },
      ],
    },
    slide: {
      image: "/images/spotlight.png",
      url: "/spotlight",
      title: "Spotlight",
      subtitle: "Event Recommendations",
      gradientScheme: {
        from: "rgb(245, 245, 245)",
        via: "rgba(177, 151, 250, 0.3)",
        to: "rgba(109, 57, 255, 0.3)",
      },
    },
  },
  {
    id: "strijp-s-ai",
    slug: "strijp-s-ai-assistant",
    title: "Strijp-S AI Assistant",
    description:
      "AI-powered assistant for navigating and accessing information about the Strijp-S district.",
    metadata: {
      year: "2024",
      category: "AI Assistant",
      technologies: [
        "AI",
        "RAG",
        "PGVector",
        "Next.js",
        "OpenAI API",
        "Weather API",
        "Google Maps API",
      ],
      role: "Full-stack Developer",
    },
    hero: {
      image: "/images/strijp-s-ai-assistant.png",
      orientation: "portrait",
    },
    content: {
      blocks: [
        {
          type: "text",
          content:
            "An AI assistant designed to make information about the Strijp-S district more accessible to visitors and residents.",
        },
      ],
    },
    slide: {
      image: "/images/strijp-s-ai-assistant.png",
      url: "/strijp-s-ai-assistant",
      title: "Strijp-S AI Assistant",
      subtitle: "Accessible Information",
      gradientScheme: {
        from: "rgb(245, 245, 245)",
        via: "rgba(186, 230, 253, 0.5)",
        to: "rgba(147, 197, 253, 0.5)",
      },
    },
  },
  {
    id: "vetemore",
    slug: "vetemore",
    title: "Vetemòre",
    description:
      "Sustainable fashion platform promoting thoughtful consumption and ethical fashion choices.",
    metadata: {
      year: "2024",
      category: "E-commerce Platform",
      technologies: ["Next.js", "SASS", "Python"],
      role: "Frontend Developer",
    },
    hero: {
      image: "/images/vetemore.png",
      orientation: "portrait",
    },
    content: {
      blocks: [
        {
          type: "text",
          content:
            "Vetemòre is a sustainable fashion platform that promotes thoughtful consumption and connects consumers with ethical fashion brands.",
        },
      ],
    },
    slide: {
      image: "/images/vetemore.png",
      url: "/vetemore",
      title: "Vetemòre",
      subtitle: "Thoughtful Fashion",
      gradientScheme: {
        from: "rgb(245, 245, 245)",
        via: "rgb(255, 230, 233, 0.3)",
        to: "rgba(254, 215, 170, 0.4)",
      },
    },
  },
  // {
  //   id: "medify"
  //   slug: "medify",
  //   title: "Medify",
  //   description:
  //     "Medify is a platform that.",
  //   metadata: {
  //     year: "2024",
  //     category: "E-commerce Platform",
  //     technologies: ["Next.js", "Tailwind CSS", "Supabase"],
  //     role: "Frontend Developer",
  //   },
  //   hero: {
  //     image: "/images/medify.png",
  //     orientation: "portrait",
  //   },
  // },
];

export const slides: Slide[] = projects.map((project) => project.slide);

// Helper functions
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getAllProjects(): Project[] {
  return projects;
}

export type { Project, ContentBlock, Slide };
