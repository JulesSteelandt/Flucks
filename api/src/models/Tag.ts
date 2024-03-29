const db = require("../config/db");

class Tag {
  static async createTags(diffusion_id: string, tag: string) {
    return db("Tag").insert({
      tag,
      diffusion_id,
    });
  }

  static async deleteTag(diffusion_id?: string) {
    return db("Tag").where("diffusion_id", diffusion_id).del();
  }
}

export default Tag;
