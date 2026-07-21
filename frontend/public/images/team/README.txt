Folder structure (matches each member's `id` in src/data/content.ts):

  public/images/team/
    team-1/photo.jpg   <- Sana Malik
    team-2/photo.jpg   <- James Whitfield
    team-3/photo.jpg   <- Aiko Tanaka
    team-4/photo.jpg   <- Omar Haddad
    team-5/photo.jpg   <- Laura Bianchi
    team-6/photo.jpg   <- Carlos Reyes

Drop a headshot (photo.jpg, or .png/.webp — match the extension in
content.ts) into each folder. If a file is missing, that card automatically
falls back to the initials avatar — nothing breaks.

Same dynamic-migration note as the portfolio/blog folders: these are plain
string paths in src/data/content.ts, so moving to a Postgres `photo_url`
column later is a data change, not a component rewrite.
