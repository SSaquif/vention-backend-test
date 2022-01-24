# Development Notes

My developer notes for the test

## Contents

<!-- toc -->

- [Development Notes](#development-notes)
  - [Contents](#contents)
  - [Issue(s)](#issues)
  - [Database Structure](#database-structure)
  - [Project Structure](#project-structure)
  - [Testing](#testing)
  - [API Endpoints](#api-endpoints)
    - [`GET` /api/weapon/power/:id](#get-apiweaponpowerid)
    - [`GET` /api/weapon/max-buildable/:id](#get-apiweaponmax-buildableid)
    - [`GET` /api/material/:id](#get-apimaterialid)
    - [`POST` /api/material](#post-apimaterial)
    - [`PATCH` /api/material/power/:id/:power](#patch-apimaterialpoweridpower)
    - [`PATCH` /api/material/quantity/:id/:qty](#patch-apimaterialquantityidqty)
    - [`DELETE` /api/material/:id](#delete-apimaterialid)
  - [Possible Improvements](#possible-improvements)

<!-- tocstop -->

## Issue(s)

I ran into an issue when trying to auto increment material `id` on insert. The migration schema and seed data was provided. But the issue stemed from the fact that apparently, auto increment does not work if the field was manually added in with the seed data. So I commented them out. The following [comment in the raised issue](https://github.com/knex/knex/issues/1855#issuecomment-559892448) helped me solve the problem. I commented out the `ids` from the given seed data.

## Database Structure

In addition to the given migration and seed data, I created separate migration and seed files for `Quest 1`

2 tables were created, `weapons` and `weapon_materials`. Table `weapons` store each weapons' data as a row. Table `weapon_materials` is a joining table used to keep track of weapons and the materials they are composed of. Each row consists of an `weapon_id` & `material_id` field, both of which are `foreign keys`.

## Project Structure

I adhered to given `route -> service layer -> model` architecture. Only interacted with the db through the models and did validations in the service layer when applicable. While routes are just in charge of receiving the request and sending back the response at the end.

In addition I also added in a assets folder, where I have pictures of my seed/initial tables taken from `pgAdmin` so that I could have a quick refernce. For the purposes of this test I did not add that to my `.gitignore` file

## Testing

I tested my work manually using the vscode extension `thunder-client` (a `postman`/`insomnia` alternative). I have packaged the endpoints used into a json file. Which can be imported into `thunder-client` might also work with `postman/insomnia` (but I am not sure of that)

## API Endpoints

### `GET` /api/weapon/power/:id

A `get` request which uses the given `id` to recursively calculate the weapon power based on it's composition. Created to test `Quest 2`

### `GET` /api/weapon/max-buildable/:id

A `get` request which uses the given `id` to recursively calculate the max number of the weapon than can be built. Created to test `Quest 5`

### `GET` /api/material/:id

This was given, returns material by provided `id`

### `POST` /api/material

Endpoint to create a new material, receives values for power level and quantity as part of `request body`

```json
{
  "power": 500,
  "qty": 16
}
```

### `PATCH` /api/material/power/:id/:power

Endpoint to update material power and recursively re-calculates and updates all connected weapons' powers as well

Returns number of modified rows in all tables on success, error message on failure

### `PATCH` /api/material/quantity/:id/:qty

Endpoint to update material quantity

Returns number of modified rows in all tables on success, error message on failure

### `DELETE` /api/material/:id

Endpoint to delete material, it actually updates the timestamp and set's status of associated weapons as specified in the quest

Returns number of modified rows in all tables on success, error message on failure

## Possible Improvements

I primarily focused on getting things working, but the following improvement to the code could be made

1. I opted to use 1 extra query in a few functions. I think if I am not mistaken I could possibly cut down 1 query by doing a join but I was not sure if that would have any increased/decreased performance benefits or issues.

2. I have set up basic data validation wherever possible, but it might be better to use some validation library like `yup` to make it foolproof
