import "./setup";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { findProject, normalizeProject, publishedProjects, withProjectsLink, type Project } from "@/content/projects";
import { newItem } from "@/lib/admin/content-meta";

const photo = { src: "/uploads/content/photo-1.webp", alt: "", width: 1280, height: 720 };
const project = (overrides: Partial<Project>) => normalizeProject({ slug: "school-erp", published: true, title: "School ERP", photo, ...overrides });

describe("normalizeProject", () => {
  it("fills every field for rows saved before a field existed", () => {
    const row = normalizeProject({ slug: " School-ERP ", title: "School ERP" });
    assert.equal(row.slug, "school-erp");
    assert.equal(row.published, false);
    assert.deepEqual(row.gallery, []);
    assert.deepEqual(row.results, []);
    assert.deepEqual(row.photo, { src: "", alt: "", width: 1280, height: 720 });
  });
});

describe("publishedProjects", () => {
  it("shows only published, complete projects with a valid, unique slug", () => {
    const items = [
      project({}),
      project({ slug: "draft", published: false }),
      project({ slug: "no-photo", photo: { src: "", alt: "" } }),
      project({ slug: "Bad Slug!" }),
      project({ slug: "no-title", title: " " }),
      project({ title: "Duplicate slug" }),
    ];
    assert.deepEqual(publishedProjects(items).map((item) => item.slug), ["school-erp"]);
  });

  it("finds a project only when it is published", () => {
    const items = [project({}), project({ slug: "draft", published: false })];
    assert.equal(findProject(items, "school-erp")?.title, "School ERP");
    assert.equal(findProject(items, "draft"), undefined);
  });
});

describe("withProjectsLink", () => {
  const nav = [
    { label: "Solutions", href: "/solutions" },
    { label: "Examples", href: "/case-studies" },
    { label: "About", href: "/about" },
  ];

  it("adds the link after Examples when projects exist", () => {
    assert.deepEqual(withProjectsLink(nav, true, "Projects").map((link) => link.href), ["/solutions", "/case-studies", "/projects", "/about"]);
  });

  it("keeps an existing link instead of adding a second one", () => {
    const withLink = [...nav, { label: "Our work", href: "/projects" }];
    assert.equal(withProjectsLink(withLink, true, "Projects").filter((link) => link.href === "/projects").length, 1);
  });

  it("removes the link while no project is published", () => {
    assert.equal(withProjectsLink([...nav, { label: "Projects", href: "/projects" }], false, "Projects").some((link) => link.href === "/projects"), false);
  });
});

describe("admin templates", () => {
  it("gives a new project and a new team member every field, unpublished by default", () => {
    const item = newItem("projects", ["items"], []) as Project;
    assert.equal(item.published, false);
    assert.ok(Array.isArray(item.gallery) && Array.isArray(item.results));
    assert.deepEqual(Object.keys(newItem("about", ["team", "people"], []) as object).sort(), ["bio", "linkedin", "name", "photo", "role"]);
    assert.deepEqual(newItem("projects", ["items", "0", "gallery"], []), { src: "", alt: "", width: 1280, height: 720 });
  });
});
