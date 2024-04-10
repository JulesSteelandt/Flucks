export function helloWorldAction(req, res, next){
  try {
    res.send("Hello depuis la racine de l'api 🦉")
  } catch (e) {
    console.error(e)
    next(500)
  }
}