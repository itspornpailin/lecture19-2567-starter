"use client";
import { Course } from "@lib/types";
import {
  Button,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  //All courses state
  const [courses, setCourses] = useState<Course[]|null>(null);
  const [loadingCourses, setLoadingCourses] = useState(false);

  //login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [authenUsername, setAuthenUsername] = useState("");

  //my courses state
  const [myCourses, setMyCourses] = useState<Course[]|null>(null);

  const loadCourses = async () => {
    const resp = await axios.get("");
  };

  const loadMyCourses = async () => {
    const resp = await axios.get("/api/enrollments");
  };

  // load courses when app starts the first time
  useEffect(() => {
    loadCourses();
  }, []);

  // load my courses when the "token" is changed (logged in successfully)
  // also load my courses when app starts the first time
  useEffect(() => {
    if (!token) return;

    loadMyCourses();
  }, [token]);

  const login = async () => {
    try {
      const resp = await axios.post("/api/user/login");

      // set token and authenUsername here
      // clear login form

    } catch (error) {
      if (error.response.data)
        // show error message from API response
        alert(error.response.data.message);
      else
        // show other error messages
        alert(error.message);
    }
  };

  const logout = () => {
    // set necessary state variables after logged out
  };

  return (
    <Container size="sm">
      <Title fs="italic" ta="center" my="xs">
        Course Enrollments
      </Title>
      <Stack>
        {/* all courses section */}
        <Paper withBorder p="md">
          <Title order={4}>All courses</Title>
          {/* <Loader variant="dots" /> */}
          {courses &&
            courses.map((course:Course) => (
              <Text key={course.courseNo}>
                {course.courseNo} - {course.title}
              </Text>
            ))}
        </Paper>

        {/* log in section */}
        <Paper withBorder p="md">
          <Title order={4}>Login</Title>
          
          {/* show login form if not logged in */}
          <Group align="flex-end">
            <TextInput
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <TextInput
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button onClick={login}>Login</Button>
          </Group>

          {/* show log out option if logged in successfully */}
          {/* <Group>
            <Text fw="bold">Hi {authenUsername}!</Text>
            <Button color="red" onClick={logout}>
              Logout
            </Button>
          </Group> */}
          
        </Paper>

        {/* enrollment section */}
        <Paper withBorder p="md">
          <Title order={4}>My courses</Title>
          <Text c="dimmed">Please login to see your course(s)</Text>

          {myCourses &&
            myCourses.map((course) => (
              <Text key={course.courseNo}>
                {course.courseNo} - {course.title}
              </Text>
            ))}
        </Paper>
      </Stack>
    </Container>
  );
}
