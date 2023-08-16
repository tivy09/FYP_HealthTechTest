<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\NoticeBoard;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;

class NoticeBoardTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $noticeBoards = [];

        for ($i = 0; $i <= 10; $i++) {
            $noticeBoard = [
                'title' => $faker->name,
                'description' => $faker->text($maxNbChars = 20),
                'type' => rand(1, 3),
                'status' => rand(0, 1),
                'image_id' => 1,
                'created_at' => Carbon::now()->addMinutes($i),
                'updated_at' => Carbon::now()->addMinutes($i),
            ];

            array_push($noticeBoards, $noticeBoard);
        }

        NoticeBoard::insert($noticeBoards);
    }
}
