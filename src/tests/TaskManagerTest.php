<?php

use PHPUnit\Framework\TestCase;
use Sebra\TestCypress\TaskManager;

class TaskManagerTest extends TestCase
{
    private TaskManager $taskManager;

    protected function setUp(): void
    {
        $this->taskManager = new TaskManager();
    }

    public function testAddTask(): void
    {
        $this->taskManager->addTask("Task 1");
        $this->assertCount(1, $this->taskManager->getTasks());
        $this->assertSame("Task 1", $this->taskManager->getTask(0));
    }

    public function testRemoveTask(): void
    {
        $this->taskManager->addTask("Task 1");
        $this->taskManager->addTask("Task 2");
        $this->taskManager->removeTask(0);

        $tasks = $this->taskManager->getTasks();
        $this->assertCount(1, $tasks);
        $this->assertSame("Task 2", $tasks[0]);
    }

    public function testGetTasks(): void
    {
        $this->taskManager->addTask("Task 1");
        $this->taskManager->addTask("Task 2");
        $tasks = $this->taskManager->getTasks();

        $this->assertCount(2, $tasks);
        $this->assertSame(["Task 1", "Task 2"], $tasks);
    }

    public function testGetTask(): void
    {
        $this->taskManager->addTask("Task 1");
        $task = $this->taskManager->getTask(0);

        $this->assertSame("Task 1", $task);
    }

    public function testRemoveInvalidIndexThrowsException(): void
    {
        $this->expectException(\OutOfBoundsException::class);
        $this->expectExceptionMessage("Index de tâche invalide: 0");

        $this->taskManager->removeTask(0);
    }

    public function testGetInvalidIndexThrowsException(): void
    {
        $this->expectException(\OutOfBoundsException::class);
        $this->expectExceptionMessage("Index de tâche invalide: 0");

        $this->taskManager->getTask(0);
    }

    public function testTaskOrderAfterRemoval(): void
    {
        $this->taskManager->addTask("Task 1");
        $this->taskManager->addTask("Task 2");
        $this->taskManager->addTask("Task 3");
        $this->taskManager->removeTask(1); // Suppression de "Task 2"

        $tasks = $this->taskManager->getTasks();
        $this->assertCount(2, $tasks);
        $this->assertSame("Task 1", $tasks[0]);
        $this->assertSame("Task 3", $tasks[1]);
    }
}
