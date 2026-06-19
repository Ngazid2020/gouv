<?php

namespace Database\Seeders;

use App\Models\Commune;
use App\Models\Elu;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EluSeeder extends Seeder
{
    public function run(): void
    {
        // [commune_nom => [[role, nom], ...]]
        // 28 communes, 3 élus chacune (Maire + 2 adjoints)
        $data = [
            'Bambao Ya Hari' => [
                ['role' => 'maire', 'nom' => 'Ibrahim Abdou Said'],
                ['role' => '1er_adjoint', 'nom' => 'Ahmed Mchinda Ali'],
                ['role' => '2e_adjoint', 'nom' => 'Fatima Said Abdou'],
            ],
            'Bambao Ya Mboini' => [
                ['role' => 'maire', 'nom' => 'Ali Youssouf Chanfi'],
                ['role' => '1er_adjoint', 'nom' => 'Moussa Djabir Mze'],
                ['role' => '2e_adjoint', 'nom' => 'Hassan Omar Attoumane'],
            ],
            'Bambao Yadjou' => [
                ['role' => 'maire', 'nom' => 'Abdou Said Mlanao'],
                ['role' => '1er_adjoint', 'nom' => 'Nourdine Amir Issouf'],
                ['role' => '2e_adjoint', 'nom' => 'Rayhana Msa Djoumbé'],
            ],
            'Bangaani' => [
                ['role' => 'maire', 'nom' => 'Said Mohamed Toihir'],
                ['role' => '1er_adjoint', 'nom' => 'Soulaimane Housseine Djae'],
                ['role' => '2e_adjoint', 'nom' => 'Omar Mzimba Hassan'],
            ],
            'Cembenoi Lac Salé' => [
                ['role' => 'maire', 'nom' => 'Ahmed Salim Mchinda'],
                ['role' => '1er_adjoint', 'nom' => 'Hamid Abdou Ali'],
                ['role' => '2e_adjoint', 'nom' => 'Nadjma Chanfi Said'],
            ],
            'Cembenoi Sada Djoulamlima' => [
                ['role' => 'maire', 'nom' => 'Kamal Mze Ibrahim'],
                ['role' => '1er_adjoint', 'nom' => 'Farouk Issouf Mohamed'],
                ['role' => '2e_adjoint', 'nom' => 'Ali Djoumbé Youssouf'],
            ],
            'Dimani' => [
                ['role' => 'maire', 'nom' => 'Mansour Said Amir'],
                ['role' => '1er_adjoint', 'nom' => 'Ibrahim Mlanao Omar'],
                ['role' => '2e_adjoint', 'nom' => 'Zouhouria Chanfi Toihir'],
            ],
            'Djoumoichongo' => [
                ['role' => 'maire', 'nom' => 'Hassan Djabir Moussa'],
                ['role' => '1er_adjoint', 'nom' => 'Abderemane Attoumane Said'],
                ['role' => '2e_adjoint', 'nom' => 'Ali Mze Abdou'],
            ],
            'Djoumoipangua' => [
                ['role' => 'maire', 'nom' => 'Said Housseine Issouf'],
                ['role' => '1er_adjoint', 'nom' => 'Omar Chanfi Djae'],
                ['role' => '2e_adjoint', 'nom' => 'Mariama Youssouf Ali'],
            ],
            'Domba' => [
                ['role' => 'maire', 'nom' => 'Moussa Djoumbé Salim'],
                ['role' => '1er_adjoint', 'nom' => 'Ahmed Toihir Mlanao'],
                ['role' => '2e_adjoint', 'nom' => 'Hamid Msa Said'],
            ],
            'Hamanvou' => [
                ['role' => 'maire', 'nom' => 'Ali Mzimba Mohamed'],
                ['role' => '1er_adjoint', 'nom' => 'Ibrahim Amir Djabir'],
                ['role' => '2e_adjoint', 'nom' => 'Nourdine Said Mze'],
            ],
            'Isahari' => [
                ['role' => 'maire', 'nom' => 'Soulaimane Abdou Chanfi'],
                ['role' => '1er_adjoint', 'nom' => 'Hassan Issouf Ali'],
                ['role' => '2e_adjoint', 'nom' => 'Hadja Omar Housseine'],
            ],
            'Itsahidi' => [
                ['role' => 'maire', 'nom' => 'Said Mchinda Abdou'],
                ['role' => '1er_adjoint', 'nom' => 'Farouk Mohamed Djae'],
                ['role' => '2e_adjoint', 'nom' => 'Ahmed Mlanao Ali'],
            ],
            'Mbadani' => [
                ['role' => 'maire', 'nom' => 'Omar Salim Issouf'],
                ['role' => '1er_adjoint', 'nom' => 'Abdou Mze Said'],
                ['role' => '2e_adjoint', 'nom' => 'Mansour Chanfi Ibrahim'],
            ],
            'Mboinkou' => [
                ['role' => 'maire', 'nom' => 'Ibrahim Housseine Djabir'],
                ['role' => '1er_adjoint', 'nom' => 'Ali Msa Toihir'],
                ['role' => '2e_adjoint', 'nom' => 'Nourdine Djoumbé Ahmed'],
            ],
            'Mitsamiouli' => [
                ['role' => 'maire', 'nom' => 'Said Amir Youssouf'],
                ['role' => '1er_adjoint', 'nom' => 'Hassan Mchinda Abdou'],
                ['role' => '2e_adjoint', 'nom' => 'Kamal Attoumane Ali'],
            ],
            'Moroni' => [
                ['role' => 'maire', 'nom' => 'Moussa Djae Said'],
                ['role' => '1er_adjoint', 'nom' => 'Ibrahim Salim Mohamed'],
                ['role' => '2e_adjoint', 'nom' => 'Hadja Mze Chanfi'],
            ],
            'Ngouengoe' => [
                ['role' => 'maire', 'nom' => 'Ali Said Mzimba'],
                ['role' => '1er_adjoint', 'nom' => 'Ahmed Issouf Omar'],
                ['role' => '2e_adjoint', 'nom' => 'Said Djoumbé Djabir'],
            ],
            'Nioumagama' => [
                ['role' => 'maire', 'nom' => 'Abdou Mlanao Housseine'],
                ['role' => '1er_adjoint', 'nom' => 'Soulaimane Toihir Ali'],
                ['role' => '2e_adjoint', 'nom' => 'Omar Msa Said'],
            ],
            'Nyuma Komo' => [
                ['role' => 'maire', 'nom' => 'Hassan Amir Chanfi'],
                ['role' => '1er_adjoint', 'nom' => 'Said Abdou Mze'],
                ['role' => '2e_adjoint', 'nom' => 'Nourdine Mohamed Issouf'],
            ],
            'Nyuma Mro' => [
                ['role' => 'maire', 'nom' => 'Ibrahim Djabir Salim'],
                ['role' => '1er_adjoint', 'nom' => 'Ali Mchinda Said'],
                ['role' => '2e_adjoint', 'nom' => 'Farouk Attoumane Housseine'],
            ],
            'Nyuma Msiru' => [
                ['role' => 'maire', 'nom' => 'Moussa Said Youssouf'],
                ['role' => '1er_adjoint', 'nom' => 'Ahmed Chanfi Djoumbé'],
                ['role' => '2e_adjoint', 'nom' => 'Omar Mlanao Toihir'],
            ],
            'Nyumamro Kiblani' => [
                ['role' => 'maire', 'nom' => 'Said Issouf Mze'],
                ['role' => '1er_adjoint', 'nom' => 'Hassan Abdou Djae'],
                ['role' => '2e_adjoint', 'nom' => 'Ibrahim Ali Msa'],
            ],
            'Nyumamro Souheili' => [
                ['role' => 'maire', 'nom' => 'Ali Housseine Mohamed'],
                ['role' => '1er_adjoint', 'nom' => 'Abdou Amir Djabir'],
                ['role' => '2e_adjoint', 'nom' => 'Mansour Said Salim'],
            ],
            'Oichili Yadjou' => [
                ['role' => 'maire', 'nom' => 'Ibrahim Said Mzimba'],
                ['role' => '1er_adjoint', 'nom' => 'Said Chanfi Mlanao'],
                ['role' => '2e_adjoint', 'nom' => 'Soulaimane Issouf Toihir'],
            ],
            'Oichili Yamboini' => [
                ['role' => 'maire', 'nom' => 'Moussa Mze Abdou'],
                ['role' => '1er_adjoint', 'nom' => 'Ahmed Said Djae'],
                ['role' => '2e_adjoint', 'nom' => 'Hassan Salim Amir'],
            ],
            'Pimba' => [
                ['role' => 'maire', 'nom' => 'Said Djoumbé Mchinda'],
                ['role' => '1er_adjoint', 'nom' => 'Ali Youssouf Housseine'],
                ['role' => '2e_adjoint', 'nom' => 'Omar Chanfi Mohamed'],
            ],
            'Tsinimoipangua' => [
                ['role' => 'maire', 'nom' => 'Hamid Abdou Mlanao'],
                ['role' => '1er_adjoint', 'nom' => 'Ibrahim Ali Issouf'],
                ['role' => '2e_adjoint', 'nom' => 'Kamal Djabir Toihir'],
            ],
        ];

        foreach ($data as $communeNom => $elus) {
            $commune = Commune::where('slug', Str::slug($communeNom))->first();
            if (! $commune) {
                continue;
            }

            foreach ($elus as $index => $eluData) {
                Elu::firstOrCreate(
                    ['commune_id' => $commune->id, 'ordre' => $index + 1],
                    array_merge($eluData, [
                        'commune_id' => $commune->id,
                        'ordre'      => $index + 1,
                    ])
                );
            }
        }
    }
}
