export const storage = {
get(key) {
try {
const item = localStorage.getItem(key);
return item ? JSON.parse(item) : null;
} catch {
return null;
}
},
set(key, value) {
return new Promise(resolve => {

setTimeout(() => {
localStorage.setItem(key, JSON.stringify(value));
resolve();
}, 100); 
});
}
};
