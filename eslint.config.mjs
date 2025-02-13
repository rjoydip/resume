import antfu from '@antfu/eslint-config'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default antfu({
  ignores: [
    'public',
    '**/mocks/**',
  ],
  gitignore: true,
  typescript: true,
  markdown: true,
  yaml: true,
  react: true,
  jsx: true,
  javascript: true,
  test: true,
  stylistic: true,
  unicorn: true,
  formatters: true,
  regexp: true,
  plugins: {
    'jsx-a11y': jsxA11y,
  },
  rules: {
    'jsx-a11y/alt-text': [2, {
      'elements': ['img', 'object', 'area', 'input[type="image"]'],
      'img': ['Image', 'AvatarImage'],
      'object': ['Object'],
      'area': ['Area'],
      'input[type="image"]': ['InputImage'],
    }],
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': [2, {
      allowedInvalidRoles: ['text'],
      ignoreNonDOM: true,
    }],
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/autocomplete-valid': [2, {
      inputComponents: ['Input', 'FormField'],
    }],
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': [2, {
      components: ['Image'],
      words: [],
    }],
    'jsx-a11y/interactive-supports-focus': [
      'error',
      {
        tabbable: [
          'button',
          'checkbox',
          'link',
          'searchbox',
          'spinbutton',
          'switch',
          'textbox',
        ],
      },
    ],
    'jsx-a11y/lang': 'error',
    'jsx-a11y/media-has-caption': [2, {
      audio: ['Audio'],
      video: ['Video'],
      track: ['Track'],
    }],
    'jsx-a11y/mouse-events-have-key-events': [
      'error',
      {
        hoverInHandlers: [
          'onMouseOver',
          'onMouseEnter',
          'onPointerOver',
          'onPointerEnter',
        ],
        hoverOutHandlers: [
          'onMouseOut',
          'onMouseLeave',
          'onPointerOut',
          'onPointerLeave',
        ],
      },
    ],
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',
    'jsx-a11y/no-autofocus': [2, {
      ignoreNonDOM: true,
    }],
    'jsx-a11y/no-distracting-elements': [2, {
      elements: ['marquee', 'blink'],
    }],
    'jsx-a11y/no-interactive-element-to-noninteractive-role': [
      'error',
      {
        tr: ['none', 'presentation'],
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      },
    ],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [
      'error',
      {
        ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
        table: ['grid'],
        td: ['gridcell'],
      },
    ],
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        tags: [],
        roles: ['tabpanel'],
        allowExpressionValues: true,
      },
    ],
    'jsx-a11y/no-redundant-roles': [
      'error',
      {
        nav: ['navigation'],
      },
    ],
    'jsx-a11y/no-static-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
        allowExpressionValues: true,
      },
    ],
    'jsx-a11y/prefer-tag-over-role': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
  },
})
