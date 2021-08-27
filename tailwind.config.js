module.exports = {
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === "production",
    content: ["./layouts/**/*.html", "./content/**/*.md", "./content/**/*.html"],
    options: {
      safelist: [
        /data-theme$/,
      ]
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': "'IBM Plex Sans', sans-serif",
    },
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
    },
    extend: {
      spacing: {
        ssection: '4.5rem',
      },
      typography: {
        css: {
          fontFamily: "'IBM Plex Sans', sans-serif",
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-logical'),
    require('daisyui'),
  ],
  daisyui: {
    logs: false,
    themes: [
      {
        "mobi": {
          'primary': '#4CA3E1',           /* Primary color */
          'primary-focus': '#3D65CB',     /* Primary color - focused */
          'primary-content': '#ffffff',   /* Foreground content color to use on primary color */

          'secondary': '#3D65CB',         /* Secondary color */
          'secondary-focus': '#111E90',   /* Secondary color - focused */
          'secondary-content': '#ffffff', /* Foreground content color to use on secondary color */

          'accent': '#37cdbe',            /* Accent color */
          'accent-focus': '#2aa79b',      /* Accent color - focused */
          'accent-content': '#ffffff',    /* Foreground content color to use on accent color */

          'neutral': '#898989',           /* Neutral color */
          'neutral-focus': '#141414',     /* Neutral color - focused */
          'neutral-content': '#ffffff',   /* Foreground content color to use on neutral color */

          'base-100': '#ffffff',          /* Base color of page, used for blank backgrounds */
          'base-200': '#f9fafb',          /* Base color, a little darker */
          'base-300': '#d1d5db',          /* Base color, even more darker */
          'base-content': '#1f2937',      /* Foreground content color to use on base color */

          'info': '#2094f3',              /* Info */
          'success': '#009485',           /* Success */
          'warning': '#ff9900',           /* Warning */
          'error': '#ff5724',             /* Error */
        }
      }
    ]
  }
}
