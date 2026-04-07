#!/bin/bash

# Update all HTML files to use the new Office Clippy theme

FILES="about.html contact.html portfolio.html services.html"

for file in $FILES; do
    echo "Updating $file..."
    
    # Create backup
    cp "$file" "$file.bak"
    
    # Update CSS link
    sed -i 's|<link rel="stylesheet" href="css/styles.min.css">|<link rel="stylesheet" href="css/office-clippy.css">|' "$file"
    
    # Update fonts
    sed -i 's|<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">|<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet">|' "$file"
    
    # Add JavaScript
    if grep -q "<script src=\"js/script.js\"></script>" "$file"; then
        sed -i 's|<script src="js/script.js"></script>|<script src="js/clippy-interactive.js"></script>\n    <script src="js/script.js"></script>|' "$file"
    fi
    
    echo "Updated $file"
done

echo "All files updated!"