<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('record_id');
            $table->string('patients');
            $table->string('patient_contact')->nullable();
            $table->string('patient_guardian')->nullable();
            $table->string('patient_guardian_contact')->nullable();
            $table->string('patient_age');
            $table->string('patient_sex');
            $table->string('patient_address')->nullable();
            $table->string('intervention');
            $table->string('management');
            $table->string('remarks');
            $table->timestamps();

            $table->foreign('record_id')
            ->references('id')
            ->on('records')
            ->onDelete('cascade');


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
