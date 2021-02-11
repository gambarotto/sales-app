module.exports = (models) => {
  return Promise.all(
    Object.keys(models).map((key) => {
      return models[key].destroy({
        where: {},
        truncate: true,
        force: true,
        cascade: true,
      });
    })
  );
};
