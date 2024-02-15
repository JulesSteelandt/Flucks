const db = require("../config/db");

class Tag {
  static async createTags(diffusion_id: string, tag: string) {
    return db("Tag").insert({
      tag,
      diffusion_id,
    });
  }
}

export default Tag;
