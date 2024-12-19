<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('galleries', function (Blueprint $table) {
            $table->string('WorksTitle', 100);
            $table->string('WorksContent', 100);
            $table->string('WorksCredit', 100);
            $table->string('WorksClient', 100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('galleries', function (Blueprint $table) {
            $table->dropColumn('WorksTitle');
            $table->dropColumn('WorksContent');
            $table->dropColumn('WorksCredit');
            $table->dropColumn('WorksClient');
        });
    }
};
