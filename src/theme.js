const root = document.documentElement;

const theme = () => {
  let mode = 'dark';
  document.addEventListener('click', (e) => {
    if (e.target.matches('.theme')) {
      if (mode === 'dark') {
        root.style.setProperty('--theme-color-one', 'white');
        root.style.setProperty('--theme-color-two', 'black');
        root.style.setProperty('--theme-color-four', 'rgba(0, 0, 0, 0.5)');
        mode = 'light';
      } else if (mode === 'light') {
        root.style.setProperty('--theme-color-one', 'black');
        root.style.setProperty('--theme-color-two', 'white');
        root.style.setProperty(
          '--theme-color-four',
          'rgba(255, 255, 255, 0.5)'
        );
        mode = 'dark';
      }
    }
  });
};

export { theme };
