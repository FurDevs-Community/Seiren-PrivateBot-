module.exports = {
  name: "threadCreate",
  async execute(thread) {
    if (thread.joinable) {await thread.join();}
  }
}