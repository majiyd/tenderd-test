module.exports = (user) => {
  try {
    return user.getIdToken(true).then((token) => {
      return {token, uuid: user.uid};
    });
  } catch (error) {
    return false;
  }
};
