const root = document.documentElement;

const sidebarIcon = document.getElementById('sidebar-icon');
const sidebarClose = document.getElementById('sb-close');
const sidebar = document.getElementById('sidebar');

const sidebarFunctions = () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('#sidebar-icon')) {
      sidebar.style.setProperty('visibility', 'visible');
      sidebar.style.setProperty('width', '250px');
      root.style.setProperty('--sidebar-items', 'translate(0px)');
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('#sb-close')) {
      root.style.setProperty('--sidebar-items', 'translate(-300px)');
      sidebar.style.setProperty('visibility', 'hidden');
      sidebar.style.setProperty('width', '0px');
    }
  });
};

export { sidebarFunctions };
