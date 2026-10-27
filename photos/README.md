# Site photos

Every banner photo on the site is a real photograph. `credits.json` lists each one: where it came from, its licence, its alt text and how it is cropped. The stock photos are from Pexels under the [Pexels License](https://www.pexels.com/license/): free for commercial use, no attribution required. Don't sell them unaltered, and don't imply the people shown endorse the company.

## Add or replace a photo

1. Put the original in `photos/source/` as `<name>.jpg` (or `.jpeg`, `.png`, `.webp`). `<name>` is the file name used in `src/content/new-images.ts`, for example `varasena-founders`. Originals are not committed.
2. Add or update the photo's entry in `credits.json`. Your own photos use `"license": "Own photo"`. The `alt` text should describe what is actually in the picture. If needed, set `"position"` (`top`, `bottom`, `left`, `right`, `attention`) to steer the 16:9 crop.
3. Run `npm run photos -- <name>` (or `npm run photos` for all). This writes `public/newImages/optimized/<name>.webp` at 1600px wide, plus 640, 960 and 1280 variants.
4. If you replaced an existing file, bump `PHOTO_VERSION` in `src/lib/photos.ts`. Returning visitors have the old file cached for up to a week.

## Photos still to add

- **`varasena-founders`**: a real photo of the founders for About → "Who you will work with". Until the file exists, that section shows the names without a photo.
- **`varasena-team-office`**: a real team or office photo for the About page header. For now it uses a free photo of the Visakhapatnam coastline.

Don't use stock photos of people for these two. Visitors would take them for your team.
