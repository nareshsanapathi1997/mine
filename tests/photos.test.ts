import "./setup";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import credits from "../photos/credits.json";
import { builtInPhotoAlt, newImages } from "@/content/new-images";
import { hasLocalPhoto } from "@/lib/photo-files";

describe("photo credits", () => {
  it("records a source and licence for every built photo", () => {
    for (const entry of credits) {
      const built = existsSync(path.join(process.cwd(), "public", "newImages", "optimized", `${entry.name}.webp`));
      if (!built) continue;
      assert.ok(entry.license, `${entry.name} has no licence`);
      if (entry.license !== "Own photo") assert.match(entry.source ?? "", /^https:\/\//, `${entry.name} has no source URL`);
      assert.ok(entry.alt.length > 10, `${entry.name} needs real alt text`);
    }
  });

  it("gives every banner a built file in all four sizes, except photos awaiting an original", () => {
    for (const image of Object.values(newImages)) {
      if (!hasLocalPhoto(image.src)) continue;
      for (const suffix of ["", "-640", "-960", "-1280"]) {
        const file = image.src.replace(/\.webp$/, `${suffix}.webp`);
        assert.ok(existsSync(path.join(process.cwd(), "public", file)), `missing ${file}`);
      }
      assert.ok(image.alt, `${image.src} has no alt text`);
    }
  });
});

describe("builtInPhotoAlt", () => {
  it("returns current alt text for built-in and legacy photo names", () => {
    const alt = credits.find((entry) => entry.name === "customer-support-desk")?.alt;
    assert.equal(builtInPhotoAlt("/newImages/optimized/customer-support-desk.webp"), alt);
    assert.equal(builtInPhotoAlt("/newImages/optimized/kyntriq-contact.webp"), alt);
  });

  it("leaves other images alone", () => {
    assert.equal(builtInPhotoAlt("/uploads/content/photo-1.png"), null);
    assert.equal(builtInPhotoAlt("https://example.com/a.webp"), null);
  });
});

describe("hasLocalPhoto", () => {
  it("hides the team photo until a real file exists", () => {
    const founders = path.join(process.cwd(), "public", "newImages", "optimized", "varasena-founders.webp");
    assert.equal(hasLocalPhoto("/newImages/optimized/varasena-founders.webp"), existsSync(founders));
    assert.equal(hasLocalPhoto("/newImages/optimized/kyntriq-about-founders.webp"), existsSync(founders));
  });

  it("treats uploads and remote images as present", () => {
    assert.equal(hasLocalPhoto("/uploads/content/photo-1.png"), true);
    assert.equal(hasLocalPhoto(undefined), false);
  });
});
