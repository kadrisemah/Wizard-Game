#!/usr/bin/env python3
"""
Enhanced PWA Icon Generator for Wizard Tournament App
Generates high-quality, professional icons for iOS and Android
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_gradient_circle(size, color1, color2):
    """Create a circular gradient background"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Create gradient
    for i in range(size):
        # Calculate gradient color
        ratio = i / size
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)

        # Draw circles from outside to inside
        draw.ellipse(
            [(i//2, i//2), (size - i//2, size - i//2)],
            fill=(r, g, b, 255)
        )

    return img

def add_letter(img, letter, font_size_ratio=0.55):
    """Add white letter 'W' with shadow effect"""
    size = img.size[0]
    draw = ImageDraw.Draw(img)

    # Calculate font size
    font_size = int(size * font_size_ratio)

    # Try to use a bold font
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            font = ImageFont.load_default()

    # Get text bounding box
    bbox = draw.textbbox((0, 0), letter, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Calculate position (centered)
    x = (size - text_width) // 2 - bbox[0]
    y = (size - text_height) // 2 - bbox[1]

    # Draw shadow (for depth)
    shadow_offset = max(2, size // 100)
    draw.text((x + shadow_offset, y + shadow_offset), letter,
              fill=(0, 0, 0, 100), font=font)

    # Draw white letter
    draw.text((x, y), letter, fill=(255, 255, 255, 255), font=font)

    return img

def create_icon(size, output_path, maskable=False):
    """Create a single icon with specified size"""
    # Purple to Cyan gradient (brand colors)
    color1 = (139, 92, 246)   # Purple (#8B5CF6)
    color2 = (6, 182, 212)     # Cyan (#06B6D4)

    # For maskable icons, add safe zone (20% padding)
    if maskable:
        # Create larger canvas
        canvas_size = size
        icon_size = int(size * 0.8)  # 80% of canvas (20% safe zone)
        padding = (canvas_size - icon_size) // 2

        # Create icon on smaller size
        icon = create_gradient_circle(icon_size, color1, color2)
        icon = add_letter(icon, 'W')

        # Create canvas and paste icon centered
        canvas = Image.new('RGBA', (canvas_size, canvas_size), (139, 92, 246, 255))
        canvas.paste(icon, (padding, padding), icon)
        img = canvas
    else:
        # Standard icon (no padding needed)
        img = create_gradient_circle(size, color1, color2)
        img = add_letter(img, 'W')

    # Save with optimization
    img.save(output_path, 'PNG', optimize=True, quality=95)
    print(f"✓ Created: {output_path} ({size}x{size})")

def main():
    """Generate all required icons"""
    # Create icons directory if it doesn't exist
    icons_dir = 'icons'
    os.makedirs(icons_dir, exist_ok=True)

    print("🎨 Generating Enhanced PWA Icons for Wizard Tournament...")
    print("=" * 60)

    # Standard icons for PWA manifest (maskable for Android adaptive icons)
    standard_sizes = [72, 96, 128, 144, 152, 192, 384, 512]

    print("\n📱 Creating Maskable Icons (Android Adaptive Icons):")
    for size in standard_sizes:
        create_icon(size, f'{icons_dir}/icon-{size}x{size}.png', maskable=True)

    # iOS-specific icons (non-maskable, no transparency)
    ios_sizes = [120, 152, 167, 180]

    print("\n🍎 Creating iOS-Specific Icons:")
    for size in ios_sizes:
        create_icon(size, f'{icons_dir}/apple-touch-icon-{size}x{size}.png', maskable=False)

    # Favicon sizes
    print("\n🌐 Creating Favicon Sizes:")
    create_icon(32, f'{icons_dir}/favicon-32x32.png', maskable=False)
    create_icon(16, f'{icons_dir}/favicon-16x16.png', maskable=False)

    print("\n" + "=" * 60)
    print("✅ All icons generated successfully!")
    print(f"📁 Icons saved to: ./{icons_dir}/")
    print("\nIcon specifications:")
    print("  • Maskable icons: 20% safe zone for Android adaptive icons")
    print("  • iOS icons: Full bleed, optimized for Apple devices")
    print("  • All icons: Purple to Cyan gradient with white 'W'")

if __name__ == '__main__':
    main()
