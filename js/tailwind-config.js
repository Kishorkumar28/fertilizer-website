// Tailwind CSS Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'brand-primary': '#1c9444',
                'brand-dark': '#14643c',
                'brand-light': '#cbdfd4',
                'brand-secondary': '#699d80',
                'brand-accent': '#82b99c',
                
                // Expanded color system
                'success': '#10b981',
                'success-light': '#d1fae5',
                'error': '#ef4444',
                'error-light': '#fee2e2',
                'info': '#3b82f6',
                'info-light': '#dbeafe',
                'warning': '#f59e0b',
                'warning-light': '#fef3c7',
            },
            fontFamily: {
                'sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'float': 'float 5s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: '#1f2937',
                        a: {
                            color: '#1c9444',
                            '&:hover': {
                                color: '#14643c',
                            },
                        },
                        h1: {
                            color: '#1f2937',
                        },
                        h2: {
                            color: '#1f2937',
                        },
                        h3: {
                            color: '#1f2937',
                        },
                        h4: {
                            color: '#1f2937',
                        },
                        blockquote: {
                            borderLeftColor: '#1c9444',
                        },
                    },
                },
            },
        },
        // Responsive screen sizes
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
    },
    plugins: [],
    // Enable responsive utilities
    variants: {
        extend: {
            opacity: ['group-hover'],
            translate: ['group-hover'],
            scale: ['group-hover', 'hover'],
            textColor: ['group-hover', 'hover'],
            backgroundColor: ['group-hover', 'hover', 'focus'],
            borderColor: ['focus', 'hover'],
            ringColor: ['focus'],
            ringWidth: ['focus'],
        }
    }
}; 