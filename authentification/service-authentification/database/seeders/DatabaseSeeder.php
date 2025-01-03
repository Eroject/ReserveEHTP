<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         \App\Models\User::factory(10)->create();

         \App\Models\User::factory()->create([
            'firstname' => 'Client',
            'lastname' => 'Cliente',
            'date_of_birth' => '2000-01-01', // Exemple de date de naissance
            'address' => '123 Example Street',
            'email' => 'client@example.com',
            'password' => bcrypt('password123'), // Mot de passe sécurisé
        ]);
        \App\Models\Club::factory()->create([
            'firstname' => 'it',
            'lastname' => 'club',
            'date_of_birth' => '1990-01-01',
            'address' => '123 Example Street',
            'email' => 'club@example.com',
            'password' => bcrypt('123456789'),
        ]);
        \App\Models\Admin::factory()->create([
            'firstname' => 'admin',
            'lastname' => 'admin',
            'date_of_birth' => '1990-01-01',
            'address' => '123 Example Street',
            'email' => 'admin@example.com',
            'password' => bcrypt('123456789'),
        ]);

    }
}
