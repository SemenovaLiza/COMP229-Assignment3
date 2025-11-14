import React, { useState } from "react";
import { Card, CardContent, Grid, TextField, Button, Typography } from "@mui/material";
import Project from "../components/project/Project";
import { projects as initialProjects } from "./../helpers/projectsList"; // rename import to avoid conflict

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects); // now uses imported initialProjects
  const [values, setValues] = useState({
    title: "",
    stack: "",
    description: "",
    img: "",
    imgBig: "",
    gitHubLink: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newProject = { ...values };

    // Add new project to the list
    setProjects([newProject, ...projects]);

    // Reset form
    setValues({
      title: "",
      stack: "",
      description: "",
      img: "",
      imgBig: "",
      gitHubLink: "",
    });
  };

  return (
    <main className="section">
      <div className="container">
        <Typography variant="h4" gutterBottom>
          Projects
        </Typography>

        {/* Form */}
        <Card sx={{ maxWidth: 800, mb: 4, p: 2 }}>
          <CardContent>
            <form onSubmit={submitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Title"
                    fullWidth
                    value={values.title}
                    onChange={handleChange("title")}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Stack"
                    fullWidth
                    value={values.stack}
                    onChange={handleChange("stack")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={values.description}
                    onChange={handleChange("description")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Image URL"
                    fullWidth
                    value={values.img}
                    onChange={handleChange("img")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Big Image URL"
                    fullWidth
                    value={values.imgBig}
                    onChange={handleChange("imgBig")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="GitHub Link"
                    fullWidth
                    value={values.gitHubLink}
                    onChange={handleChange("gitHubLink")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Add Project
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>

        {/* Project List */}
        <ul className="projects">
          {projects.map((project, index) => (
            <Project key={index} title={project.title} img={project.img} index={index} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Projects;
