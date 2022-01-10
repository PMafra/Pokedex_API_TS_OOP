import app, { init } from './app';

init().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Magic happens on: ${process.env.PORT}`);
    });
});
