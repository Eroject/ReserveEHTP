<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    // database/factories/UserFactory.php
public function definition()
{
    return [
        'firstname' => $this->faker->firstName,
        'lastname' => $this->faker->lastName,
        'email' => $this->faker->unique()->safeEmail,
        'date_of_birth' => $this->faker->date(),
        'address' => $this->faker->address,
        'password' => bcrypt('password'), // ou Hash::make('password')
        'remember_token' => Str::random(10),
    ];
}


    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
