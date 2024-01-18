
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const RetroCustomTheme: CustomThemeConfig = {
    name: 'retro-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-family-heading": `SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "255 255 255",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #2de2e6 
		"--color-primary-50": "224 251 251", // #e0fbfb
		"--color-primary-100": "213 249 250", // #d5f9fa
		"--color-primary-200": "203 248 249", // #cbf8f9
		"--color-primary-300": "171 243 245", // #abf3f5
		"--color-primary-400": "108 235 238", // #6cebee
		"--color-primary-500": "45 226 230", // #2de2e6
		"--color-primary-600": "41 203 207", // #29cbcf
		"--color-primary-700": "34 170 173", // #22aaad
		"--color-primary-800": "27 136 138", // #1b888a
		"--color-primary-900": "22 111 113", // #166f71
		// secondary | #0EA5E9 
		"--color-secondary-50": "219 242 252", // #dbf2fc
		"--color-secondary-100": "207 237 251", // #cfedfb
		"--color-secondary-200": "195 233 250", // #c3e9fa
		"--color-secondary-300": "159 219 246", // #9fdbf6
		"--color-secondary-400": "86 192 240", // #56c0f0
		"--color-secondary-500": "14 165 233", // #0EA5E9
		"--color-secondary-600": "13 149 210", // #0d95d2
		"--color-secondary-700": "11 124 175", // #0b7caf
		"--color-secondary-800": "8 99 140", // #08638c
		"--color-secondary-900": "7 81 114", // #075172
		// tertiary | #035ee8 
		"--color-tertiary-50": "217 231 252", // #d9e7fc
		"--color-tertiary-100": "205 223 250", // #cddffa
		"--color-tertiary-200": "192 215 249", // #c0d7f9
		"--color-tertiary-300": "154 191 246", // #9abff6
		"--color-tertiary-400": "79 142 239", // #4f8eef
		"--color-tertiary-500": "3 94 232", // #035ee8
		"--color-tertiary-600": "3 85 209", // #0355d1
		"--color-tertiary-700": "2 71 174", // #0247ae
		"--color-tertiary-800": "2 56 139", // #02388b
		"--color-tertiary-900": "1 46 114", // #012e72
		// success | #84cc16 
		"--color-success-50": "237 247 220", // #edf7dc
		"--color-success-100": "230 245 208", // #e6f5d0
		"--color-success-200": "224 242 197", // #e0f2c5
		"--color-success-300": "206 235 162", // #ceeba2
		"--color-success-400": "169 219 92", // #a9db5c
		"--color-success-500": "132 204 22", // #84cc16
		"--color-success-600": "119 184 20", // #77b814
		"--color-success-700": "99 153 17", // #639911
		"--color-success-800": "79 122 13", // #4f7a0d
		"--color-success-900": "65 100 11", // #41640b
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #D41976 
		"--color-error-50": "249 221 234", // #f9ddea
		"--color-error-100": "246 209 228", // #f6d1e4
		"--color-error-200": "244 198 221", // #f4c6dd
		"--color-error-300": "238 163 200", // #eea3c8
		"--color-error-400": "225 94 159", // #e15e9f
		"--color-error-500": "212 25 118", // #D41976
		"--color-error-600": "191 23 106", // #bf176a
		"--color-error-700": "159 19 89", // #9f1359
		"--color-error-800": "127 15 71", // #7f0f47
		"--color-error-900": "104 12 58", // #680c3a
		// surface | #9700cc 
		"--color-surface-50": "239 217 247", // #efd9f7
		"--color-surface-100": "234 204 245", // #eaccf5
		"--color-surface-200": "229 191 242", // #e5bff2
		"--color-surface-300": "213 153 235", // #d599eb
		"--color-surface-400": "182 77 219", // #b64ddb
		"--color-surface-500": "151 0 204", // #9700cc
		"--color-surface-600": "136 0 184", // #8800b8
		"--color-surface-700": "113 0 153", // #710099
		"--color-surface-800": "91 0 122", // #5b007a
		"--color-surface-900": "74 0 100", // #4a0064
		
	}
}