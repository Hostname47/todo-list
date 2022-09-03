
function useTasksFetch({ handleError }) {
  const request = indexedDB.open('todos', 1)

  request.onerror = function (event) {
    handleError()
  };    

  request.onupgradeneeded = function () {
    const db = request.result;
    const store = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
    store.createIndex("done_tasks", ["done"], { unique: false });
  };

  return request.onsuccess = function() {
    const db = request.result;
    const transaction = db.transaction("tasks", 'readonly');

    const store = transaction.objectStore("tasks");
    const dataRequest = store.getAll()

    return dataRequest
  }
}

export default useTasksFetch