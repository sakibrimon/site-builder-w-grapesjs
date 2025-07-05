"use client";

import React, { useEffect, useRef } from 'react';
import grapesjs, { Editor } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

// Import plugins
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import gjsBlocksBasic from 'grapesjs-blocks-basic';
import gjsPluginForms from 'grapesjs-plugin-forms';
import gjsComponentCountdown from 'grapesjs-component-countdown';
import gjsPluginExport from 'grapesjs-plugin-export';
import gjsTabs from 'grapesjs-tabs';
import gjsCustomCode from 'grapesjs-custom-code';
import gjsParserPostcss from 'grapesjs-parser-postcss';
import gjsTooltip from 'grapesjs-tooltip';
import gjsTuiImageEditor from 'grapesjs-tui-image-editor';
import gjsTyped from 'grapesjs-typed';
import gjsStyleBg from 'grapesjs-style-bg';

const GrapesEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editor = useRef<Editor | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize GrapesJS editor
    editor.current = grapesjs.init({
      container: editorRef.current,
      height: '100vh',
      width: 'auto',
      storageManager: {
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
      },
      plugins: [
        gjsPresetWebpage,
        gjsBlocksBasic,
        gjsPluginForms,
        gjsComponentCountdown,
        gjsPluginExport,
        gjsTabs,
        gjsCustomCode,
        gjsParserPostcss,
        gjsTooltip,
        gjsTuiImageEditor,
        gjsTyped,
        gjsStyleBg,
      ],
      pluginsOpts: {
        'gjs-preset-webpage': {
          modalImportTitle: 'Import Template',
          modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
          modalImportContent: function(editor: Editor) {
            return editor.getHtml() + '<style>' + editor.getCss() + '</style>';
          },
          filestackOpts: null,
          aviaryOpts: false,
          blocksBasicOpts: {
            blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video'],
            flexGrid: 1,
          },
          customStyleManager: [{
            name: 'General',
            buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
            properties: [{
              name: 'Alignment',
              property: 'float',
              type: 'radio',
              defaults: 'none',
              list: [
                { value: 'none', className: 'fa fa-times'},
                { value: 'left', className: 'fa fa-align-left'},
                { value: 'right', className: 'fa fa-align-right'}
              ],
            }, {
              property: 'position',
              type: 'select',
            }]
          }, {
            name: 'Dimension',
            open: false,
            buildProps: ['width', 'min-height', 'padding'],
            properties: [{
              id: 'flex',
              type: 'integer',
              name: 'Flex',
              units: ['', 'px', '%', 'em'],
              property: 'flex',
              toRequire: 1,
            }, {
              property: 'margin',
              properties: [
                { name: 'Top', property: 'margin-top'},
                { name: 'Right', property: 'margin-right'},
                { name: 'Bottom', property: 'margin-bottom'},
                { name: 'Left', property: 'margin-left'}
              ],
            }, {
              property: 'padding',
              properties: [
                { name: 'Top', property: 'padding-top'},
                { name: 'Right', property: 'padding-right'},
                { name: 'Bottom', property: 'padding-bottom'},
                { name: 'Left', property: 'padding-left'}
              ],
            }]
          }, {
            name: 'Typography',
            open: false,
            buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'text-shadow'],
            properties: [{
              name: 'Font',
              property: 'font-family'
            }, {
              name: 'Weight',
              property: 'font-weight'
            }, {
              name: 'Font color',
              property: 'color',
            }, {
              property: 'text-align',
              type: 'radio',
              defaults: 'left',
              list: [
                { value: 'left', name: 'Left', className: 'fa fa-align-left'},
                { value: 'center', name: 'Center', className: 'fa fa-align-center' },
                { value: 'right', name: 'Right', className: 'fa fa-align-right'},
                { value: 'justify', name: 'Justify', className: 'fa fa-align-justify'}
              ],
            }, {
              property: 'text-decoration',
              type: 'radio',
              defaults: 'none',
              list: [
                { value: 'none', name: 'None', className: 'fa fa-times'},
                { value: 'underline', name: 'underline', className: 'fa fa-underline' },
                { value: 'line-through', name: 'Line-through', className: 'fa fa-strikethrough'}
              ],
            }, {
              property: 'text-shadow',
              properties: [
                { name: 'X position', property: 'text-shadow-h'},
                { name: 'Y position', property: 'text-shadow-v'},
                { name: 'Blur', property: 'text-shadow-blur'},
                { name: 'Color', property: 'text-shadow-color'}
              ],
            }]
          }, {
            name: 'Decorations',
            open: false,
            buildProps: ['opacity', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
            properties: [{
              type: 'slider',
              property: 'opacity',
              defaults: 1,
              step: 0.01,
              max: 1,
              min: 0,
            }, {
              property: 'border-radius',
              properties: [
                { name: 'Top', property: 'border-top-left-radius'},
                { name: 'Right', property: 'border-top-right-radius'},
                { name: 'Bottom', property: 'border-bottom-left-radius'},
                { name: 'Left', property: 'border-bottom-right-radius'}
              ],
            }, {
              property: 'box-shadow',
              properties: [
                { name: 'X position', property: 'box-shadow-h'},
                { name: 'Y position', property: 'box-shadow-v'},
                { name: 'Blur', property: 'box-shadow-blur'},
                { name: 'Spread', property: 'box-shadow-spread'},
                { name: 'Color', property: 'box-shadow-color'},
                { name: 'Shadow type', property: 'box-shadow-type'}
              ],
            }, {
              id: 'background-bg',
              property: 'background',
              type: 'bg',
            }]
          }, {
            name: 'Extra',
            open: false,
            buildProps: ['transition', 'perspective', 'transform'],
            properties: [{
              property: 'transition',
              properties: [
                { name: 'Property', property: 'transition-property'},
                { name: 'Duration', property: 'transition-duration'},
                { name: 'Easing', property: 'transition-timing-function'}
              ],
            }, {
              property: 'transform',
              properties: [
                { name: 'Rotate X', property: 'transform-rotate-x'},
                { name: 'Rotate Y', property: 'transform-rotate-y'},
                { name: 'Rotate Z', property: 'transform-rotate-z'},
                { name: 'Scale X', property: 'transform-scale-x'},
                { name: 'Scale Y', property: 'transform-scale-y'},
                { name: 'Scale Z', property: 'transform-scale-z'}
              ],
            }]
          }]
        },
        'gjs-blocks-basic': {
          flexGrid: true,
        },
        'gjs-plugin-forms': {},
        'gjs-component-countdown': {},
        'gjs-plugin-export': {},
        'gjs-tabs': {},
        'gjs-custom-code': {},
        'gjs-parser-postcss': {},
        'gjs-tooltip': {},
        'gjs-tui-image-editor': {
          script: [
            'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
            'https://uicdn.toast.com/tui-image-editor/v3.2.2/tui-image-editor.min.js'
          ],
          style: [
            'https://uicdn.toast.com/tui-image-editor/v3.2.2/tui-image-editor.min.css',
          ],
        },
        'gjs-typed': {},
        'gjs-style-bg': {},
      },
      canvas: {
        styles: [
          'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
          'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
        ],
        scripts: []
      },
      assetManager: {
        embedAsBase64: true,
        assets: [
          'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
          'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
          'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
          'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop'
        ]
      }
    });

    // Add shadcn/ui component blocks
    editor.current.BlockManager.add('shadcn-button', {
      label: 'Button',
      category: 'shadcn/ui',
      content: `
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Button
        </button>
      `,
      media: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`
    });

    editor.current.BlockManager.add('shadcn-card', {
      label: 'Card',
      category: 'shadcn/ui',
      content: `
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm max-w-sm">
          <div class="flex flex-col space-y-1.5 p-6">
            <h3 class="text-2xl font-semibold leading-none tracking-tight">Card Title</h3>
            <p class="text-sm text-muted-foreground">Card description goes here</p>
          </div>
          <div class="p-6 pt-0">
            <p>Card content goes here. You can add any content you want.</p>
          </div>
          <div class="flex items-center p-6 pt-0">
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Action
            </button>
          </div>
        </div>
      `,
      media: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm16 16V5H5v14h14z"/></svg>`
    });

    editor.current.BlockManager.add('shadcn-badge', {
      label: 'Badge',
      category: 'shadcn/ui',
      content: `
        <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
          Badge
        </div>
      `,
      media: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
    });

    editor.current.BlockManager.add('shadcn-input', {
      label: 'Input',
      category: 'shadcn/ui',
      content: `
        <input type="text" placeholder="Enter text..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
      `,
      media: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/></svg>`
    });

    editor.current.BlockManager.add('shadcn-avatar', {
      label: 'Avatar',
      category: 'shadcn/ui',
      content: `
        <div class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <img class="aspect-square h-full w-full" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" alt="Avatar" />
        </div>
      `,
      media: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`
    });

    editor.current.BlockManager.add('shadcn-feature-card', {
      label: 'Feature Card',
      category: 'shadcn/ui',
      content: `
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold">Feature Title</h3>
              <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground">
                New
              </div>
            </div>
          </div>
          <p class="text-muted-foreground mb-4">
            This is a beautiful feature card built with shadcn/ui components. It includes an icon, title, badge, and description.
          </p>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
            Learn More
          </button>
        </div>
      `,
      media: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
    });

    editor.current.BlockManager.add('shadcn-pricing-card', {
      label: 'Pricing Card',
      category: 'shadcn/ui',
      content: `
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm max-w-sm">
          <div class="flex flex-col space-y-1.5 p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-2xl font-semibold leading-none tracking-tight">Pro Plan</h3>
              <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary text-primary-foreground">
                Popular
              </div>
            </div>
            <p class="text-sm text-muted-foreground">Perfect for growing businesses</p>
          </div>
          <div class="p-6 pt-0">
            <div class="text-3xl font-bold">$29<span class="text-sm font-normal text-muted-foreground">/month</span></div>
            <ul class="mt-4 space-y-2 text-sm">
              <li class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Unlimited projects
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Priority support
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Advanced analytics
              </li>
            </ul>
          </div>
          <div class="flex items-center p-6 pt-0">
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
              Get Started
            </button>
          </div>
        </div>
      `,
      media: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
    });

    editor.current.BlockManager.add('shadcn-testimonial', {
      label: 'Testimonial',
      category: 'shadcn/ui',
      content: `
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div class="flex items-start space-x-4">
            <div class="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <img class="aspect-square h-full w-full" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" alt="Avatar" />
            </div>
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-2">
                <h4 class="font-semibold">John Doe</h4>
                <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground">
                  Verified
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">CEO at TechCorp</p>
              <p class="text-sm leading-relaxed">
                "This product has completely transformed how we work. The interface is intuitive and the features are exactly what we needed. Highly recommended!"
              </p>
              <div class="flex items-center mt-3">
                <div class="flex text-yellow-400">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <span class="ml-2 text-xs text-muted-foreground">5.0</span>
              </div>
            </div>
          </div>
        </div>
      `,
      media: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"/></svg>`
    });

    // Add existing custom blocks
    editor.current.BlockManager.add('hero-section', {
      label: 'Hero Section',
      category: 'Sections',
      content: `
        <section class="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style="background-image: url('https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop')">
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
          <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">Build Visually with React</h1>
            <p class="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">A seamless editing experience using your components</p>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
              Get Started
            </button>
          </div>
        </section>
      `,
      media: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
    });

    editor.current.BlockManager.add('section-container', {
      label: 'Section Container',
      category: 'Layout',
      content: `
        <section class="py-24 px-8 bg-background">
          <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-12 text-foreground">Section Title</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <!-- Add your content here -->
            </div>
          </div>
        </section>
      `,
      media: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm16 16V5H5v14h14z"/></svg>`
    });

    // Set initial content with shadcn/ui components
    editor.current.setComponents(`
      <section class="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style="background-image: url('https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop')">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">Build with shadcn/ui</h1>
          <p class="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">Beautiful components built with Radix UI and Tailwind CSS</p>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
            Get Started
          </button>
        </div>
      </section>

      <section class="py-24 px-8 bg-background">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-4 text-foreground">Beautiful Components</h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              Drag and drop these professionally designed components to build your next project
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold">Modular Design</h3>
                  <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground">
                    New
                  </div>
                </div>
              </div>
              <p class="text-muted-foreground mb-4">
                Build with reusable components that maintain consistency across your application.
              </p>
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                Learn More
              </button>
            </div>
            
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold">Visual Editor</h3>
                  <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary text-primary-foreground">
                    Popular
                  </div>
                </div>
              </div>
              <p class="text-muted-foreground mb-4">
                Drag and drop interface with real-time preview and instant feedback.
              </p>
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                Learn More
              </button>
            </div>
            
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold">React Integration</h3>
                </div>
              </div>
              <p class="text-muted-foreground mb-4">
                Seamlessly integrate with your existing React components and TypeScript.
              </p>
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                Learn More
              </button>
            </div>
          </div>
          
          <div class="text-center">
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
              Start Building
            </button>
          </div>
        </div>
      </section>
    `);

    // Add custom CSS for shadcn/ui design system
    editor.current.setStyle(`
      :root {
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --card: 0 0% 100%;
        --card-foreground: 222.2 84% 4.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 222.2 84% 4.9%;
        --primary: 221.2 83.2% 53.3%;
        --primary-foreground: 210 40% 98%;
        --secondary: 210 40% 96%;
        --secondary-foreground: 222.2 84% 4.9%;
        --muted: 210 40% 96%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --accent: 210 40% 96%;
        --accent-foreground: 222.2 84% 4.9%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 210 40% 98%;
        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;
        --ring: 221.2 83.2% 53.3%;
        --radius: 0.5rem;
      }
      
      * {
        box-sizing: border-box;
        border-color: hsl(var(--border));
      }
      
      body {
        margin: 0;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        line-height: 1.6;
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
      }
      
      .bg-background { background-color: hsl(var(--background)); }
      .bg-foreground { background-color: hsl(var(--foreground)); }
      .bg-card { background-color: hsl(var(--card)); }
      .bg-primary { background-color: hsl(var(--primary)); }
      .bg-secondary { background-color: hsl(var(--secondary)); }
      .bg-muted { background-color: hsl(var(--muted)); }
      .bg-accent { background-color: hsl(var(--accent)); }
      .bg-primary\\/10 { background-color: hsl(var(--primary) / 0.1); }
      
      .text-background { color: hsl(var(--background)); }
      .text-foreground { color: hsl(var(--foreground)); }
      .text-card { color: hsl(var(--card)); }
      .text-card-foreground { color: hsl(var(--card-foreground)); }
      .text-primary { color: hsl(var(--primary)); }
      .text-primary-foreground { color: hsl(var(--primary-foreground)); }
      .text-secondary { color: hsl(var(--secondary)); }
      .text-secondary-foreground { color: hsl(var(--secondary-foreground)); }
      .text-muted-foreground { color: hsl(var(--muted-foreground)); }
      .text-accent-foreground { color: hsl(var(--accent-foreground)); }
      
      .border { border-width: 1px; }
      .border-input { border-color: hsl(var(--input)); }
      .border-transparent { border-color: transparent; }
      
      .ring-offset-background { --tw-ring-offset-color: hsl(var(--background)); }
      .ring-ring { --tw-ring-color: hsl(var(--ring)); }
      
      .hover\\:bg-primary\\/90:hover { background-color: hsl(var(--primary) / 0.9); }
      .hover\\:bg-secondary\\/80:hover { background-color: hsl(var(--secondary) / 0.8); }
      .hover\\:bg-accent:hover { background-color: hsl(var(--accent)); }
      .hover\\:text-accent-foreground:hover { color: hsl(var(--accent-foreground)); }
      .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
      
      .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; }
      .transition-shadow { transition-property: box-shadow; }
      .transition-all { transition-property: all; }
      .duration-300 { transition-duration: 300ms; }
      
      .focus-visible\\:outline-none:focus-visible { outline: 2px solid transparent; outline-offset: 2px; }
      .focus-visible\\:ring-2:focus-visible { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
      .focus-visible\\:ring-ring:focus-visible { --tw-ring-color: hsl(var(--ring)); }
      .focus-visible\\:ring-offset-2:focus-visible { --tw-ring-offset-width: 2px; }
      
      .disabled\\:pointer-events-none:disabled { pointer-events: none; }
      .disabled\\:opacity-50:disabled { opacity: 0.5; }
      .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
    `);

    // Add custom CSS for better editor styling
    editor.current.addStyle(`
      .gjs-block-category {
        padding: 10px;
        font-weight: 600;
        color: #374151;
        border-bottom: 1px solid #e5e7eb;
        background: #f9fafb;
      }
      
      .gjs-block {
        border-radius: 8px;
        margin: 8px;
        transition: all 0.2s ease;
        border: 1px solid #e5e7eb;
      }
      
      .gjs-block:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-color: #3b82f6;
      }
      
      .gjs-pn-panel {
        background: #ffffff;
        border-right: 1px solid #e5e7eb;
      }
      
      .gjs-pn-btn {
        border-radius: 6px;
        margin: 2px;
        transition: all 0.2s ease;
      }
      
      .gjs-pn-btn:hover {
        background: #f3f4f6;
      }
      
      .gjs-pn-btn.gjs-pn-active {
        background: #3b82f6;
        color: white;
      }
    `);

    return () => {
      if (editor.current) {
        editor.current.destroy();
      }
    };
  }, []);

  return (
    <div className="h-screen w-full">
      <div ref={editorRef} className="h-full" />
    </div>
  );
};

export default GrapesEditor;