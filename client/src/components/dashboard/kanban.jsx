import { Grid, GridItem, Box, Text, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react"; // Import useEffect
import tasksData from "../../data/tasks/tasks.json";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]); // Initialisez avec un tableau vide

  useEffect(() => {
    // Fonction pour charger les données JSON
    const fetchData = async () => {
      try {
        // Remplacez "data.json" par le chemin de votre fichier JSON
        // const response = await fetch("");
        // const data = await response.json();
        setTasks(tasksData); // Mettez à jour l'état avec les données JSON
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Appelez la fonction pour charger les données au chargement du composant
  }, []); // Utilisez une dépendance vide pour que cela ne se produise qu'une seule fois au chargement du composant

  const handleAddTask = () => {
    const newTask = { id: tasks.length + 1, title: "New Task", status: "todo" };
    setTasks([...tasks, newTask]);
  };

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      {/* Bouclez sur les différentes colonnes */}
      {["todo", "in progress", "done", "canceled", "impeded"].map((status) => (
        <GridItem key={status} colSpan={1}>
          <Box bg="gray.200" p={4} borderRadius="md">
            <Text fontWeight="bold" mb={2}>
              {status === "todo"
                ? "To Do"
                : status === "in progress"
                ? "in Progress"
                : status === "impeded"
                ? "impeded"
                : status === "canceled"
                ? "canceled"
                : "Done"}
            </Text>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <Box
                  key={task.id}
                  bg="white"
                  p={2}
                  mb={2}
                  borderRadius="md"
                  boxShadow="md">
                  <Text>{task.title}</Text>
                </Box>
              ))}
            {status === "todo" && ( // Affiche le bouton d'ajout uniquement pour "To Do"
              <IconButton
                icon={<AddIcon />}
                aria-label="Add task"
                size="sm"
                onClick={handleAddTask}
              />
            )}
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default KanbanBoard;
