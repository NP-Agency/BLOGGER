---
name: tagui
description: Provides instructions on how to write TagUI scripts for web, mouse, and keyboard automation.
---

# TagUI Skill Guide

*Use the `/skills` command in your chat interface to open the configuration menu.*

**TagUI** is an open-source RPA (Robotic Process Automation) tool that helps automate web, mouse, and keyboard actions.

## Core Concepts
TagUI uses a natural-language-like syntax to interact with web pages and desktop UI.

### Web Identifiers
TagUI can identify web elements using DOM attributes, XPath, or CSS selectors:
```tagui
// Type text into an element
type email as user@gmail.com
type //*[@id="password"] as 12345678

// Click a button
click Log in
click #submit-btn
```

### Visual Identifiers (Computer Vision)
You can use images of UI elements if DOM is inaccessible:
```tagui
type email_box.png as user@gmail.com
click login_button.png
```

### Coordinate Identifiers
Interact with specific X/Y screen coordinates:
```tagui
type (720,400) as user@gmail.com
click (720,500)
```

## Basic Commands
- `click [target]`: Clicks on the target.
- `hover [target]`: Hovers the mouse over the target.
- `type [target] as [text]`: Enters text into a field. Use `[enter]` for the enter key.
- `read [target] to [variable]`: Reads text from a UI element into a variable.
- `echo [text]`: Prints text to the terminal.
- `wait [time]`: Waits for a specified duration (e.g., `wait 5s`).
- `snap [target] to [filename]`: Takes a screenshot of a specific element or `page`.
- `keyboard [keys]`: Simulates keyboard presses (e.g., `keyboard [cmd]c`).

## Usage in this Project
In this Blogger project, TagUI must be used for tasks that cannot be handled via standard APIs. 

### Rules for the Agent:
1. Save all scripts with the `.tag` extension (e.g., `publish_blog.tag`).
2. Always prefer robust Web Identifiers (XPath/CSS) over coordinates or images.
3. Explicitly add `wait 3s` or `wait [element]` after navigating to a new page to prevent execution timeouts.
4. Use the `echo` command to log progress steps within the script for easier debugging.
