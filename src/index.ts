import config from './utils/config';
import app from './app';

app.listen(config.PORT || 4000, () => {
  console.log(
    `Server running on port ${config.PORT} in ${config.NODE_ENV} mode.`
  );
});
