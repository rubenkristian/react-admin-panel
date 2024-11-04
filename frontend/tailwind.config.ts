import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'blue-gray/900': '#101828',
        'blue-gray/800': '#1D2939',
        'blue-gray/500': '#667085',
        'blue-gray/300': '#D0D5DD',
        'arctic-blue/600': '#253BFF',
        'blue-gray/600': '#475467',
        'lime-green/400': '#9FF443'
      },
      width: {
        'item': '208px',
        'sidebar': '240px',
        'path': '52px',
        'dropdown': '350px',
        'btn-tree': '282px',
        'icon-plus': '23px',
        'form-view': '532px',
        'small-button': '63px',
        'medium-button': '133px',
        'large-button': '263px',
      },
      height: {
        'item': '48px',
        'desktop-menu-path': '84px',
        'mobile-menu-path': '42px',
        'path': '52px',
        'dropdown': '52px',
        'btn-tree': '38px',
        'icon-plus': '23px',
        'small-button': '24px',
        'medium-button': '38px',
        'large-button': '52px',
      },
      padding: {
        'item': '12px',
        'sidebar': '10px 16px',
        'header-sidebar': '30px 32px',
        'dropdown': '14px 16px',
      },
      gap: {
        'item': '16px'
      },
      borderRadius: {
        'btn-tree': '48px',
      },
      margin: {
        'btn-tree': '38px 0',
      }
    },
  },
  plugins: [],
};
export default config;
