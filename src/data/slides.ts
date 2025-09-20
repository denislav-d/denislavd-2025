import { GradientScheme } from "@/utils/gradients";

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
  subtitle: string;
  slideImage: string;
  description: string;
  metadata: {
    year: string;
    category: string;
    technologies: string[];
    role: string;
  };
  hero: {
    type: "image" | "video";
    src: string;
    alt?: string;
    orientation: "portrait" | "landscape";
  };
  content: {
    blocks: ContentBlock[];
  };
  gradientScheme: GradientScheme;
}

export const projects: Project[] = [
  {
    id: "mutual-imprint",
    slug: "mutual-imprint",
    title: "Mutual Imprint",
    subtitle: "Dutch Design Week 2025",
    slideImage: "/media/ddw.png",
    description:
      "Bringing people together with virtual hugs! An interactive installation that explores human connection through technology, combining real-time body tracking and digital visualization, translating movements and interactions into a shared and immersive experience.",
    metadata: {
      year: "2025",
      category: "Interactive Installation for Dutch Design Week 2025",
      technologies: ["Spline", "WebGL", "TouchDesigner"],
      role: "Lead Developer & Interaction Designer",
    },
    hero: {
      type: "image",
      src: "/media/ddw/ddw-hero.png",
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
          src: "/media/ddw/ddw-generated-hug.png",
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
          src: "/media/ddw/ddw-touch-designer-process.png",
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
            "/media/ddw/ddw-3d-split.png",
            "/media/ddw/ddw-merged.png",
            "/media/ddw/ddw-lattice.png",
          ],
        },
        {
          type: "text",
          content: `## The Initial Tracking Demo
            For the initial POC demo, I created a web-based hand-tracking demo using WebGL, [Spline](https://spline.design/), and [MediaPipe](https://github.com/google-ai-edge/mediapipe). The interaction allows users to control a soft, blob-like form with their hand, while a static gummy-like virtual human acts as the second entity. When the two overlap, especially at the center of its body, the forms begin to merge and grow into a large, rounded shape, playfully simulating the feeling of human connection.`,
        },
        {
          type: "video",
          src: "/media/ddw/ddw-blob-demo.mp4",
        },
        {
          type: "text",
          content: `## The Poster
           For the poster design, we wanted to capture the emotional essence of the project in a single visual. The two abstract, glowing entities merging together symbolize the intimacy of a hug and the warmth of human connection, while the bold gradient typography reinforces the meaning of the message.`,
        },
        {
          type: "image",
          src: "/media/ddw.png",
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
          src: "/media/ddw/ddw-innovations-demo.mp4",
        },
      ],
    },
    gradientScheme: {
      from: "rgb(245, 245, 245)",
      via: "rgba(251, 146, 60, 0.3)",
      to: "rgba(236, 72, 153, 0.3)",
    },
  },
  {
    id: "strijp-s-ai",
    slug: "strijp-s-ai-assistant",
    title: "Strijp-S AI Assistant",
    subtitle: "Accessible Information",
    slideImage: "/media/strijp-s-ai-assistant.png",
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
      type: "video",
      src: "/media/strijp-s-ai/strijp-s-ai-video.mov",
      orientation: "landscape",
    },
    content: {
      blocks: [
        {
          type: "text",
          content: `## The Concept
            During my internship at Gewest13, a digital branding studio specializing in award-winning websites and campaigns, I was assigned to design and implement an AI chatbot tool for the newly updated Strijp-S website. The idea was to create a tailored, intelligent assistant that enhances user experience by answering location-specific questions and providing helpful resources, making the information more accessible to visitors and users. Beyond Strijp-S, the chatbot needed to be scalable and adaptable, so it could later be integrated into other client projects, collaborators’ platforms, and organizations.`,
        },
        {
          type: "image",
          src: "/media/strijp-s-ai/strijp-s-ai-intro.png",
          orientation: "landscape",
        },
        {
          type: "text",
          content: `## The Process
            #### Technical Foundations
            I researched and made key decisions about the AI model, hosting platform, database structure, and retrieval methods. This involved comparing solutions, running tests, gathering feedback, and refining prototypes. I then developed and integrated the chosen solution into the Strijp-S website, ensuring it was stable and ready for deployment.

            #### Tailored User Experience
            I designed the chatbot to meet the specific needs of Strijp-S users. Through research, iterative prototypes, and continuous feedback sessions, I shaped the chatbot to provide accurate, relevant, and user-friendly interactions.

            #### Additional Features
            Throughout the project, I also explored various vector databases to store embeddings and handle semantic search. Leveraged the Vercel AI SDK, implemented API integrations for Google Maps and Weather API, and collected user input to improve the model and analytics. Other features include refreshing the answer, copying the response, and clearing the chat for usability.`,
        },
        {
          type: "image",
          src: "/media/strijp-s-ai/strijp-s-ai-desktop.png",
          orientation: "landscape",
        },
        {
          type: "text",
          content: `## The Final Result
         The outcome was a modern, professional AI chatbot fully integrated into the Strijp-S website. It offered a user-friendly interface aligned with the site’s design, smart, domain-specific answers to Strijp-S users’ questions, additional helpful features like travel routes, weather updates, and feedback options, and a scalable framework, allowing Gewest13 to adapt the chatbot for future clients and projects. The chatbot serves as a valuable user experience enhancement for every website it is integrated into.`,
        },
        {
          type: "gallery",
          images: [
            "/media/strijp-s-ai/strijp-s-ai-privacy.png",
            "/media/strijp-s-ai/strijp-s-ai-mobile.png",
            "/media/strijp-s-ai/strijp-s-ai-feedback.png",
          ],
        },
      ],
    },
    gradientScheme: {
      from: "rgb(245, 245, 245)",
      via: "rgba(186, 230, 253, 0.5)",
      to: "rgba(147, 197, 253, 0.5)",
    },
  },
  {
    id: "detaile",
    slug: "detaile",
    title: "Detaile",
    subtitle: "Perfect Outfits",
    slideImage: "/media/detaile.png",
    description:
      "Detaile explores the idea of a stylist application that generates personalized outfit recommendations powered by Artificial Intelligence which are adjusted to the user's personal style, preferences, and location.",
    metadata: {
      year: "2025",
      category: "Native iOS Application",
      technologies: ["SwiftUI", "AI", "OpenAI API", "CoreML"],
      role: "Mobile Developer",
    },
    hero: {
      type: "image",
      src: "/media/detaile/detaile-hero.png",
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
          src: "/media/detaile/detaile-concept.png",
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
            "/media/detaile/detaile-wardrobe.png",
            "/media/detaile/detaile-item-details.png",
            "/media/detaile/detaile-account.png",
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
            "/media/detaile/detaile-style-grid.png",
            "/media/detaile/detaile-location.png",
            "/media/detaile/detaile-settings.png",
          ],
        },
        {
          type: "text",
          content: `## The Poster`,
        },
        {
          type: "image",
          src: "/media/detaile/detaile-poster.png",
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
            "/media/detaile/detaile-daily-detaile.png",
            "/media/detaile/detaile-favorites.png",
            "/media/detaile/detaile-resize.png",
          ],
        },
      ],
    },
    gradientScheme: {
      from: "rgb(245, 245, 245)",
      via: "rgb(228, 228, 231)",
      to: "rgb(214, 211, 209)",
    },
  },
  {
    id: "spotlight",
    slug: "spotlight",
    title: "Spotlight",
    subtitle: "Event Recommendations",
    slideImage: "/media/spotlight.png",
    description:
      "Spotlight helps users discover local events and activities based on their interests, location, and Spotify account. It allows you to login with your Spotify account and choose the playlists to get recommendations on, since you might be sharing the account with someone else or are just in a specific mood. The application then provides you with recommendations of events which you might like based on your music taste.",
    metadata: {
      year: "2024",
      category: "Progressive Web App",
      technologies: ["Next.js", "SCSS", "Spotify API"],
      role: "Frontend Developer",
    },
    hero: {
      type: "image",
      src: "/media/spotlight/spotlight-hero.png",
      orientation: "landscape",
    },
    content: {
      blocks: [
        {
          type: "text",
          content: `## The Concept
          The project originated from [Citric Labs](https://citriclabs.xyz/)’ initial idea, which my team and I further developed into the full application. The core concept was to integrate Spotify, so that users could log in with their accounts and receive personalized event recommendations based on their listening habits. To make the experience more flexible, the app also allows users to select specific playlists, ensuring recommendations match their current mood or personal taste, even if the account is shared.`,
        },
        {
          type: "gallery",
          images: [
            "/media/spotlight/spotlight-playlists.png",
            "/media/spotlight/spotlight-home.png",
            "/media/spotlight/spotlight-artists.png",
          ],
        },
        {
          type: "text",
          content: `## The Process
          My role as the frontend developer was to create a consistent and engaging user interface, closely aligned with designer-provided wireframes. I worked collaboratively with the design teammate to translate stakeholder requirements into a functional and intuitive interface, focusing on usability and visual consistency. This involved implementing interactive features such as playlist selection, onboarding flows, event cards with recommendation percentages, and ensuring smooth integration with Spotify. My responsibility was not just to build the user interface, but also to maintain cohesion between design intent and the technical execution.
          
          ## The Final Demo
          The final application provides users with a seamless experience for discovering events they are likely to enjoy. Key features include logging in using your Spotify account, personalized recommendations based on selected playlists, upcoming artist concerts, favoriting events, and location-based filtering. Users can preview artists through an embedded Spotify player, view detailed event pages, and quickly get redirected to purchase tickets directly. Altogether, the result was a polished, user-focused product that balanced personalization, interactivity, and practicality.`,
        },
        {
          type: "gallery",
          images: [
            "/media/spotlight/spotlight-artist-1.png",
            "/media/spotlight/spotlight-artist-2.png",
            "/media/spotlight/spotlight-about.png",
          ],
        },
      ],
    },
    gradientScheme: {
      from: "rgb(245, 245, 245)",
      via: "rgba(177, 151, 250, 0.3)",
      to: "rgba(109, 57, 255, 0.3)",
    },
  },
  {
    id: "vetemore",
    slug: "vetemore",
    title: "Vetemòre",
    subtitle: "Thoughtful Fashion",
    slideImage: "/media/vetemore.png",
    description: `
            Vetemòre is an online fashion store designed to provide more than just products, promoting thoughtful consumption and sustainable choices. The platform focuses on offering curated information about brands, designers, and the world of fashion, filling the gap of a centralised source for fashion enthusiasts and newcomers. The name comes from the French “vêtements” (clothes) combined with “more”, highlighting its focus on both fashion items and deeper insights into the culture of fashion.`,
    metadata: {
      year: "2024",
      category: "E-commerce Platform",
      technologies: ["Next.js", "SASS", "Python"],
      role: "Frontend Developer",
    },
    hero: {
      type: "image",
      src: "/media/vetemore/vetemore-hero.png",
      orientation: "landscape",
    },
    content: {
      blocks: [
        {
          type: "text",
          content: `The development of Vetemòre was centered on building a functional, visually refined, and informative platform for fashion enthusiasts. A minimalistic design was chosen to match the aesthetics of high fashion. Data for the products was scraped, filtered, and stored in structured CSV files, which were then dynamically rendered using Next.js. Dynamic routing was implemented to allow seamless navigation between brand, designer, and product-specific pages.

          Key e-commerce functionalities such as sorting, filtering, recommendation system, were implemented, ensuring a smooth and intuitive browsing experience for users. To guarantee stability and usability, the application was tested with Cypress, covering frontend regression testing scenarios. The result was a scalable and modern web application that combines a product showcase with a strong editorial component, offering not only an online fashion store but also a source of knowledge about the broader fashion world.`,
        },
        {
          type: "image",
          src: "/media/vetemore/vetemore-desktop.png",
          orientation: "landscape",
        },
      ],
    },
    gradientScheme: {
      from: "rgb(245, 245, 245)",
      via: "rgba(238, 232, 170, 0.4)",
      to: "rgba(218, 165, 32, 0.4)",
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
  //     image: "/media/medify.png",
  //     orientation: "portrait",
  //   },
  // },
];

export const slides: Project[] = projects;

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

export type { Project, ContentBlock };
