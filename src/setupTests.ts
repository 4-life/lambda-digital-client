import '@testing-library/jest-dom';

// react-modal requires a DOM element with id="root"
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);
