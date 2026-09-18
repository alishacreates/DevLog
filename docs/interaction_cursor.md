## Interaction & Cursor Rules

Interactive elements should clearly communicate when they can be acted upon.

### Cursor Behaviour

- Clickable buttons and controls use `cursor-pointer`.
- Disabled controls use `cursor-not-allowed`.
- Links use their standard pointer behaviour.
- Non-interactive content keeps the default cursor.

### Pending Actions

When an asynchronous action is in progress:

- Disable the control where duplicate actions could occur.
- Use `cursor-not-allowed`.
- Reduce opacity to communicate the disabled state.
- Preserve enough visual feedback for the user to understand that the action is processing.

Example:

```tsx
className="
  cursor-pointer
  disabled:cursor-not-allowed
  disabled:opacity-50
"