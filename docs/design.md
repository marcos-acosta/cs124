# CS 124 Labs Design Doc

## Design decisions
We began thinking about the design by listing all of the things we knew
that the web app was going to need to do. We decided the best way was
to make it similar to how a hand-written to-do list might be designed.
Here is a very early sketch of what we thought that might look like.

<img src="images/designs/veryearlydesign.png" width="300px">

From there we designed some more specifics about how to accomplish different tasks.
We decided that to add an item, we would place a button at the bottom
of the screen that would create a dummy item in an editing mode for the user
to add a button. By doing this, we thought it would be very clear both what
that button was for, and how to use it, since it is big, clearly labeled, and
in an appropriate location for a mobile app. To edit or delete items, we
didn't want those options to clutter up the main screen by being present for
all tasks at all times, but we still wanted to make it task specific, so
the user knows exactly what they are editing or deleting. So, we decided to
create a menu attached to each task. So, first the user selects to view
the menu, and then chooses the operation they want to perform. We chose
this menu to look like an arrow so that it would signal it was pressable,
and would provide a menu. For completed tasks, we decided that when the user
clicked the checkbox to complete a task, it would check the box, cross through
the task, and move it to a "completed" section. Here is an image of how we drew
out our main design to be before coding.

<img src="images/designs/initialdesignmockup.png" width="300px">

### Lab 2 Updates
After implementing our design as a React app, we made a few different and additional design choices.
One such choice was to use an arrow rather than a carrot for the menu drop-down. Another was to have items fade in and out as they appear, disappear, or relocate on the screen. Part of this design decision
was motivated by the desire to give the user immediate feedback when they check an item. So, when an item is marked as completed it immediately looks completed, and then there's a pause before it moves to the completed section.
We also added a button for if there are no tasks to complete, as an empty-task-placeholder, being able to click anywhere and have it exit the edit window.
Another design choice was how to handle long text in an item. What we decided to do was to set a character limit, and then afterwards it would elide the text. If the user clicks on the menu, then they can see the whole text, but then it would limit how much space an individual task can take up normally.

### Lab3 Updates
We made a few more design decisions in the process of implementing lab 3. When we created the priority functionality, we decided to add
those buttons in the drop-down menu with the edit and delete buttons, but have the user be able to view the priority of each task on a column to the left of each task,
leaving a task with no priority set blank. 

<img src="images/designs/taskpriority.PNG" width="200px">

We gave these priority indicators colors to reflect the level of priority, and when the user
selects priority, it highlights the selected level with the same color. The user can select a new priority, or unselect to give the task no priority at all.
As part of the sorting, we gave the user a drop-down menu at the top to select how they want to sort the tasks, where the default is oldest-newest. The other
options are newest-oldest, alphabetical order, or priority. We couldn't decide whether oldest-newest or newest-oldest order would be better, so we just decided
to offer both since different users might find both helpful.

## Alternative designs
A few alternative designs we considered were related to the task edit and
deleted menus. We considered at one point using ellipses rather than an arrow
that rotated when opened or closed. We also considered having it come
in from the side, rather than be below the task, and have symbols rather than
words for the user to select the operation. Here's an image of what we thought
that might have looked like.

<img src="images/designs/oldtaskmenudesign.png" width="200px">

One alternative design for the priority was to have the priority indicators as part of the
task itself, but we though that it might make the task itself look cluttered and leave less room
for the task itself, so we went with the external indicator.

<img src="images/designs/taskpriorityalt.PNG" width="200px">

## Final designs
The general idea of our final design can be seen in this "template" page we developed:

<img src="images/snapshots/template.png" width="300px">

To avoid cluttering up each todo item with options (e.g. edit, delete), we placed them under a drop-down menu that will scale easily if more options are introduced.

### Add first item

<img src="images/snapshots/addItem.png" width="500px">

To add an item, the user presses the `+ add item` button at the bottom of the screen, and a new task is immediately created. The task input field is immediately brought into focus so that the user can begin typing their todo, and the task is "solidified" once they hit `enter` on their keyboard.

### Add second item

<img src="images/snapshots/addSecondItem.png" width="500px">

The procedure for adding another item is exactly the same as adding the first.

### Mark item as completed

<img src="images/snapshots/markItemCompleted.png" width="500px">

To mark an item as completed, the user taps on either the check box or the task text itself. The item stays in the todo list momentarily, and then moves itself into the `completed` section. This delay is to help the user see that their item has been marked completed before moving to another category (as opposed to instantly vanishing), but it should also be fast enough so that the user isn't surprised by the item spontaneously moving itself a few seconds later.

### Rename an item

<img src="images/snapshots/renameItem.png" width="500px">

To rename an item, the user taps the dropdown menu next to an item to reveal more options. They they tap the `edit` button, which brings the task text into focus and brings up the keyboard. In the meantime, the `edit` and `delete` buttons become temporarily disabled while the user types. When the user is finished, they hit `enter` on their keyboard to end the renaming and "solidify" the task again.

### Show all completed items

<img src="images/snapshots/showAllCompleted.png" width="300px">

Completed items are shown by default so that users can easily see what they've finished so far.

### Clear all completed items

<img src="images/snapshots/clearAllCompleted.png" width="400px">

To clear all completed items, the user simply presses the `clear` button, which makes the completed items disappear.

## Challenges
One challenge was when we made the React app and had to figure out how to work with memory and storing the data, and then figuring out how to change it. We initially changed the initial data and then re-rendered the page, but we moved it into states instead so we don't change the data itself, instead changing the state and creating new data for the re-render.
### Lab3 Challenges
Challenges we encountered at this step was when we implemented the sorting. We had to figure out whether it was better to sort as we pulled from Firestore, if we wanted to sort with the already pulled data. We ultimately
went with the latter because then we didn't get the loading screen every time a user changed the task lists, whether that was adding, editing, or deleting a task. We also struggled trying to prevent auto-sorting when adding or editing a task 
when the list was in alphabetical order. We thought that preventing sorting from happening while a task was in edit mode was the best way, but we weren't sure how to implement that right away. Adding whether a task was in edit mode
as part of the database seemed bad practice, as did trying to create another component for a task in edit mode that then had to re-merge with the other tasks. Ultimately, we moved the editable state up one level and added a condition in the 
sorting conditions so that if the task is in edit-mode it is always the first in the list, so whenever a task is being added or edited it is moved to the top of the list and then re-sorted when the user is done.


## Highlights
In addition to (what we think is) a clean, uncluttered design, we think the method for adding todo items is the most in line with direct manipulation, since users can see their next item appear directly in the list of items without being confronted with a popup menu first. It also removes unnecessary ("20%") options that the user won't need most of the time so they can add that task off the top of their head as quickly and intuitively as possible.
We're also very proud of how when the user checks an item, it fades out before moving to the completed section. We believe it to be a nice usability touch, and nicely implemented.