Folder structure (matches each person's `id` in src/data/content.ts ->
leadershipTeam):

  public/images/leadership/
    managing-director/photo.jpg

To add another leader later, add a new entry to the leadershipTeam array in
content.ts with a new id, then create a matching folder here, e.g.:

  public/images/leadership/chair/photo.jpg

If a photo is missing, that row falls back to a designed placeholder
instead of a broken image.
