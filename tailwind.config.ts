import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Pixel RPG Game Colors
				room: {
					wall: 'hsl(var(--room-wall))',
					floor: 'hsl(var(--room-floor))',
					furniture: 'hsl(var(--room-furniture))'
				},
				outdoor: {
					sky: 'hsl(var(--outdoor-sky))',
					grass: 'hsl(var(--outdoor-grass))',
					tree: 'hsl(var(--outdoor-tree))'
				},
				character: {
					skin: 'hsl(var(--character-skin))',
					hair: 'hsl(var(--character-hair))',
					outfit: 'hsl(var(--character-outfit))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				'pixel': ['monospace', 'Courier New', 'monospace']
			},
			fontSize: {
				'pixel-xs': ['8px', '12px'],
				'pixel-sm': ['12px', '16px'],
				'pixel-base': ['16px', '20px'],
				'pixel-lg': ['20px', '24px']
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pixel-walk': {
					'0%, 100%': { transform: 'translateX(0px)' },
					'50%': { transform: 'translateX(2px)' }
				},
				'scene-transition': {
					'0%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'character-bounce': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-4px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pixel-walk': 'pixel-walk 0.6s ease-in-out infinite',
				'scene-transition': 'scene-transition 1s ease-in-out',
				'character-bounce': 'character-bounce 1s ease-in-out infinite'
			},
			boxShadow: {
				'pixel': 'var(--shadow-pixel)',
				'character-glow': 'var(--glow-character)'
			},
			backgroundImage: {
				'gradient-room': 'var(--gradient-room)',
				'gradient-outdoor': 'var(--gradient-outdoor)',
				'gradient-ui': 'var(--gradient-ui)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
