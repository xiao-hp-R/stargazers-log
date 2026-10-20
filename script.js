const repositoryList = document.querySelector("#repository-list");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren();

    for (const repository of repositories) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const description = document.createElement("p");
      const date = document.createElement("time");

      link.href = repository.url;
      link.textContent = repository.name;
      description.textContent = repository.description;
      date.dateTime = repository.starredAt;
      date.textContent = `Starred on ${new Date(`${repository.starredAt}T00:00:00`).toLocaleDateString()}`;

      item.append(link, description, date);
      repositoryList.append(item);
    }
  } catch (error) {
    console.error("Unable to load starred repositories:", error);
    repositoryList.replaceChildren();
    const message = document.createElement("li");
    message.textContent = "Starred repositories could not be loaded. Please try again later.";
    repositoryList.append(message);
  }
}

loadRepositories();
