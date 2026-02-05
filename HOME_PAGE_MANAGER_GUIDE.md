# Home Page Manager Guide

## Overview
The Home Page Manager allows you to customize which products appear on the home page and in which sections. This gives you full control over your home page product display without touching any code.

## How to Access

1. Navigate to the **Admin Panel** (requires admin login)
2. Click the **"HOME PAGE CONTROL"** button in the header
3. The Home Page Manager modal will open

## Features

### 1. **View All Sections**
- See all configured home page sections
- View section order, title, subtitle, and number of selected products
- See which sections are enabled/disabled

### 2. **Manage Section Order**
- Use the **up/down arrow buttons** to reorder sections
- Sections appear on the home page in the order shown

### 3. **Enable/Disable Sections**
- Click the **eye icon** to toggle section visibility
- Disabled sections won't appear on the home page but are saved for later

### 4. **Edit Section**
Click the **Edit (pencil) icon** on any section to customize:

- **Section Title**: The main heading (e.g., "PREMIER ARCHIVES")
- **Section Subtitle**: The small text above the title (e.g., "Inventory")
- **Accent Color**: Choose from White, Red, Blue, Green, Yellow, or Purple
- **Products**: Select which products to display (unlimited selection)

### 5. **Add New Section**
1. Click **"ADD SECTION"** button
2. Configure the section settings
3. Select products to display
4. Click **"SAVE SECTION"**

### 6. **Delete Section**
- Click the **trash icon** to permanently remove a section
- This cannot be undone

## Product Selection

When editing a section:
- All available products are listed
- Click on any product card to select/deselect it
- Selected products are highlighted in blue
- The counter shows how many products are selected
- You can select as many products as you want

## Default Configuration

The system comes with 3 pre-configured sections:

1. **PREMIER ARCHIVES** (White accent) - Products 1-4
2. **ELITE SELECTION** (Red accent) - Products 5-8
3. **FRESH INVENTORY** (Blue accent) - Products 9-12

## Tips

- **Keep it organized**: Use descriptive titles and subtitles
- **Color coding**: Use different accent colors to create visual hierarchy
- **Product selection**: Choose 4 products per section for the best grid layout
- **Order matters**: Place your most important sections at the top
- **Test visibility**: Disable sections temporarily to test different layouts

## Technical Details

- Configuration is saved in browser's localStorage
- Changes are immediate - refresh the home page to see updates
- Works across admin sessions
- Safe to experiment - you can always reset by deleting and recreating sections

## Troubleshooting

**Section not showing on home page?**
- Check if the section is enabled (eye icon)
- Ensure you've selected at least one product
- Make sure the selected products still exist in inventory

**Lost configuration?**
- Clearing browser cache/localStorage will reset to defaults
- Consider backing up your configuration by documenting section settings

**Colors not showing correctly?**
- Some Tailwind color classes may need to be added to your CSS configuration
- Contact developer if custom colors are needed

## Support

For additional customization or issues, contact your development team.
