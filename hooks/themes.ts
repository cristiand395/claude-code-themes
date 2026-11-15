import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

type Theme = { label: string; look: ThemeSetArgs; problems: readonly string[] }

function build(label: string, input: Omit<Parameters<typeof makeColors>[0], 'label'>, backdrop?: ThemeSetArgs['backdrop']): Theme {
  const { theme, problems } = makeColors({ label, ...input })

  return { label, look: backdrop === undefined ? { colors: theme } : { colors: theme, backdrop }, problems }
}

export const THEMES: Record<string, Theme> = {
  synthwave: build(
    "Synthwave '84",
    {
      only: 'dark',
      roles: { accent: '#ff7edb', danger: '#fe4450', success: '#72f1b8', warning: '#fede5d', pro: '#36f9f6' },
      dark: {
        gray: {
          anchors: {
            'surface-0': '#1e1a2b',
            'surface-1': '#241b2f',
            'surface-2': '#262335',
            'surface-3': '#2a2139',
            'text-primary': '#ffffff',
            'text-secondary': '#d6d1f0',
            'text-muted': '#a8aed6',
          },
        },
        git: { added: '#72f1b8', removed: '#fe4450', modified: '#fede5d', merged: '#ff7edb', conflicting: '#f97e72' },
      },
    },
    { scene: 'sunset-grid', glass: { blur: 24, tint: '#1e1a2b', opacity: 0.78 } },
  ),
  dracula: build('Dracula', {
    only: 'dark',
    roles: { accent: '#bd93f9', danger: '#ff5555', success: '#50fa7b', warning: '#ffb86c', pro: '#ff79c6' },
    dark: {
      gray: {
        anchors: {
          'surface-0': '#191a21',
          'surface-1': '#21222c',
          'surface-2': '#282a36',
          'surface-3': '#2c2e3b',
          'text-primary': '#f8f8f2',
          'text-secondary': '#d4d6e4',
          'text-muted': '#a4acd0',
        },
      },
      git: { added: '#50fa7b', removed: '#ff5555', modified: '#f1fa8c', merged: '#bd93f9' },
    },
  }),
  tokyo: build('Tokyo Night', {
    only: 'dark',
    roles: { accent: '#7aa2f7', danger: '#f7768e', success: '#9ece6a', warning: '#e0af68', pro: '#bb9af7' },
    dark: {
      gray: {
        anchors: {
          'surface-0': '#16161e',
          'surface-1': '#1a1b26',
          'surface-2': '#1f2335',
          'surface-3': '#222639',
          'text-primary': '#d5dcfa',
          'text-secondary': '#a9b1d6',
          'text-muted': '#8f98c6',
        },
      },
      git: { added: '#9ece6a', removed: '#f7768e', modified: '#e0af68', merged: '#bb9af7' },
    },
  }),
  gruvbox: build('Gruvbox', {
    roles: { accent: '#d65d0e', danger: '#cc241d', success: '#98971a', warning: '#d79921', pro: '#b16286' },
    light: {
      gray: {
        anchors: {
          'surface-0': '#f2e5bc',
          'surface-1': '#fbf1c7',
          'surface-2': '#f9f5d7',
          'text-primary': '#282828',
          'text-secondary': '#3c3836',
          'text-muted': '#5a524c',
        },
      },
    },
    dark: {
      gray: {
        anchors: {
          'surface-0': '#1d2021',
          'surface-1': '#282828',
          'surface-2': '#2e2c2b',
          'surface-3': '#32302f',
          'text-primary': '#fbf1c7',
          'text-secondary': '#d5c4a1',
          'text-muted': '#bdae93',
        },
      },
    },
  }),
  onedark: build('One Dark Pro Night Flat', {
    only: 'dark',
    roles: { accent: '#c678dd', danger: '#e06c75', success: '#98c379', warning: '#e5c07b', pro: '#d19a66' },
    dark: {
      gray: {
        anchors: {
          'surface-0': '#121417',
          'surface-1': '#16191d',
          'surface-2': '#1b1e23',
          'surface-3': '#1e2227',
          'text-primary': '#d7dae0',
          'text-secondary': '#abb2bf',
          'text-muted': '#8c919a',
        },
      },
      git: { added: '#98c379', removed: '#e06c75', modified: '#e5c07b', merged: '#61afef' },
    },
  }),
  jellyfish: build('Jellyfish', {
    only: 'dark',
    // No amber in Jellyfish: warning keeps a soft gold so it still reads as a warning.
    roles: { accent: '#da68fb', danger: '#f88dad', success: '#68edc6', warning: '#f5c46a', pro: '#acafff' },
    dark: {
      gray: {
        anchors: {
          'surface-0': '#111113',
          'surface-1': '#151517',
          'surface-2': '#1a1a1d',
          'surface-3': '#1d1d21',
          'text-primary': '#e6e6e6',
          'text-secondary': '#cccccc',
          'text-muted': '#9a9aa2',
        },
      },
      git: { added: '#68edc6', removed: '#f88dad', modified: '#5cc9f5', merged: '#da68fb' },
    },
  }),
  claude: build('Claude', {
    only: 'dark',
    // Claude's terracotta orange, pinned as the exact accent fill. In the desktop sidebar the
    // warning fill paints the dot of a chat waiting on an answer, so warning stays yellow.
    roles: {
      accent: { seed: '#d97757', fillShade: 400, stops: { 400: '#d97757' } },
      danger: '#ef4f4f',
      success: '#8bd49b',
      warning: '#f2c94c',
      pro: '#a99bf0',
    },
    dark: {
      gray: {
        anchors: {
          // Pure black page for OLED; the others only a step up so cards still read.
          'surface-0': '#000000',
          'surface-1': '#050505',
          'surface-2': '#0a0a09',
          'surface-3': '#0f0f0e',
          'text-primary': '#f5f3ec',
          'text-secondary': '#cfccc2',
          // The sidebar's busy and finished dots both follow text-muted, so it carries Claude orange.
          'text-muted': '#d97757',
        },
      },
      git: {
        added: '#8bd49b',
        removed: '#ef5a5a',
        modified: '#f2c94c',
        merged: '#e89478',
        closed: '#f47c7c',
        conflicting: '#f2a678',
        draft: '#b3b0a7',
      },
    },
  }),
}

export const DEFAULT_THEME = 'synthwave'
